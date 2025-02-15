"use client";

import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PoseFeedback, YogaPose } from "@/lib/yoga-poses";
import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createPoseData } from "./actions";

export function WebcamComponent({
  pose,
  duration,
}: {
  pose: YogaPose;
  duration: number;
}) {
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker>();
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [lastVideoTime, setLastVideoTime] = useState(-1);
  const [feedbacks, setFeedbacks] = useState<
    {
      time: number;
      feedbacks: PoseFeedback[];
    }[]
  >([]);
  const [timer, setTimer] = useState<number>(4);
  const [timeLeft, setTimeLeft] = useState<number>(duration);

  const playing = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoElement = useRef<HTMLVideoElement>(null);
  const canvasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    ).then((vision) => {
      PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_heavy/float16/latest/pose_landmarker_heavy.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
      }).then((landmarker) => setPoseLandmarker(landmarker));
    });

    navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setMediaDevices(videoDevices);
      });
    });
  }, []);

  useEffect(() => {
    if (!selectedDevice) return;
    navigator.mediaDevices
      .getUserMedia({ video: { deviceId: selectedDevice } })
      .then((stream) => {
        const video = document.getElementById("webcam") as HTMLVideoElement;
        video.srcObject = stream;
      });

    const countdownInterval = setInterval(() => {
      setTimer((prev) => {
        if (typeof prev !== "number") return 0;
        if (prev <= 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [selectedDevice]);

  useEffect(() => {
    if (timer !== 0) return;
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (typeof prev !== "number") return 0;
        if (prev <= 0) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timer]);

  useEffect(() => {
    const now = performance.now();
    const recentFeedbacks = feedbacks.filter((f) => now - f.time < 1500);

    const jointFeedbacks = new Map<string, { extend: number; bend: number }>();

    recentFeedbacks.forEach(({ feedbacks }) => {
      feedbacks.forEach(({ joint, feedback }) => {
        if (!jointFeedbacks.has(joint)) {
          jointFeedbacks.set(joint, { extend: 0, bend: 0 });
        }
        const counts = jointFeedbacks.get(joint)!;
        if (feedback?.includes("Extend")) counts.extend++;
        if (feedback?.includes("Bend")) counts.bend++;
      });
    });

    const threshold = recentFeedbacks.length * 0.9;
    for (const [joint, counts] of jointFeedbacks.entries()) {
      if (counts.extend < threshold && counts.bend < threshold) {
        jointFeedbacks.delete(joint);
      }
    }

    const feedbackString = Array.from(jointFeedbacks.entries())
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, counts]) => counts.extend > 0 || counts.bend > 0)
      .map(
        ([joint, counts]) =>
          `${
            counts.extend > counts.bend ? "extend" : "bend"
          } your ${joint} more`
      )
      .join(", ");

    if (feedbackString.length) {
      async function generateAndPlaySpeech() {
        try {
          if (playing.current) return;
          playing.current = true;
          const response = await fetch("/api/speech", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: feedbackString }),
          });
          if (timeLeft <= 0) return;

          const { audioUrl } = await response.json();
          audioRef.current!.src = audioUrl;
          await audioRef.current!.play();
          audioRef.current!.addEventListener(
            "ended",
            () => (playing.current = false)
          );
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
      generateAndPlaySpeech();
    }
  }, [feedbacks, playing, timeLeft]);

  useEffect(() => {
    if (timeLeft !== 0) return;
    audioRef.current!.src = "/sounds/finish.mp3";
    const feedbackData = feedbacks.flatMap(({ time, feedbacks }) =>
      feedbacks.map((f) => ({
        ...f,
        feedback: f.feedback ?? null,
        time,
      }))
    );
    audioRef.current!.play().then(() => {
      const { unwrap } = toast.promise(
        createPoseData({
          name: pose.name,
          duration,
          feedbacks: feedbackData,
        }),
        {
          loading: "Saving your performance...",
          success: "Saved your performance!",
          error: "Failed to save your performance.",
        }
      );
      unwrap().then((v) => redirect(`/poses/view/${v.id}`));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    if (!selectedDevice || !poseLandmarker || !videoElement.current) return;

    async function predictWebcam() {
      if (!selectedDevice || !poseLandmarker || !videoElement.current) return;

      const startTimeMs = performance.now();
      const canvasCtx = canvasElement.current!.getContext("2d")!;
      const drawingUtils = new DrawingUtils(canvasCtx);

      if (lastVideoTime !== videoElement.current.currentTime) {
        setLastVideoTime(videoElement.current.currentTime);
        poseLandmarker.detectForVideo(
          videoElement.current,
          startTimeMs,
          (result) => {
            if (!canvasElement.current) return;
            canvasCtx.save();
            canvasCtx.clearRect(
              0,
              0,
              canvasElement.current.width,
              canvasElement.current.height
            );
            for (const landmark of result.landmarks) {
              drawingUtils.drawLandmarks(landmark, {
                radius: (data) =>
                  DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
              });
              drawingUtils.drawConnectors(
                landmark,
                PoseLandmarker.POSE_CONNECTIONS
              );
            }
            if (pose.constraints) {
              try {
                const feedback = pose.constraints(result.worldLandmarks[0]);
                setFeedbacks((prev) => [
                  ...prev,
                  { time: performance.now(), feedbacks: feedback },
                ]);
              } catch {}
            }
            canvasCtx.restore();
          }
        );
      }
      window.requestAnimationFrame(predictWebcam);
    }
    setTimeout(() => predictWebcam(), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDevice, poseLandmarker]);

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <audio ref={audioRef}></audio>
        <Label>Camera</Label>
        <Select onValueChange={(v) => setSelectedDevice(v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a camera" />
          </SelectTrigger>
          <SelectContent>
            {mediaDevices
              .filter(({ deviceId }) => deviceId !== "")
              .map((device) => (
                <SelectItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid">
        <video
          id="webcam"
          className="col-start-1 row-start-1"
          autoPlay
          playsInline
          ref={videoElement}
        ></video>
        <canvas
          id="output_canvas"
          className="col-start-1 row-start-1 w-full h-full"
          ref={canvasElement}
        ></canvas>
        {timer !== undefined && timer > 0 && timer < 4 && (
          <div className="col-start-1 row-start-1 w-full h-full flex items-center justify-center">
            <span className="text-9xl font-bold text-white drop-shadow-lg">
              {timer}
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <Progress value={((duration - timeLeft) * 100) / duration} />
        <span className="whitespace-nowrap">{timeLeft} seconds left</span>
      </div>
      <Table>
        <TableCaption>Some feedback from our model.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Joint</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Angle</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feedbacks.at(-1)?.feedbacks.map((value, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{value.joint}</TableCell>
              <TableCell>{value.feedback}</TableCell>
              <TableCell>{value.angle.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
