"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";
import { useEffect, useRef, useState } from "react";

export function WebcamComponent() {
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker>();
  const [mediaDevices, setMediaDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [lastVideoTime, setLastVideoTime] = useState(-1);

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

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setMediaDevices(videoDevices);
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
  }, [selectedDevice]);

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
            canvasCtx.restore();
          }
        );
      }
      window.requestAnimationFrame(predictWebcam);
    }
    setTimeout(() => predictWebcam(), 2000);
  }, [selectedDevice, poseLandmarker]);

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <Label>Camera</Label>
        <Select onValueChange={(v) => setSelectedDevice(v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a camera" />
          </SelectTrigger>
          <SelectContent>
            {mediaDevices.map((device) => (
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
      </div>
    </>
  );
}
