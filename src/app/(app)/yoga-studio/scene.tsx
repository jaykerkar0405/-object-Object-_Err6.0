"use client";

import "aframe";
import { useEffect, useRef, useState } from "react";

export function Scene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera access error:", err));
  }, []);

  const playAudio = () => {
    if (audioRef.current && !audioPlayed) {
      audioRef.current
        .play()
        .catch((err) => console.error("Audio play error:", err));
      setAudioPlayed(true);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden"
      onClick={playAudio} // Play audio on first click
    >
      {/* Nature Sound */}
      <audio ref={audioRef} src="/nature.mp3" loop></audio>

      {/* Camera Background */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      ></video>

      {/* @ts-expect-error: old ahh library */}
      <a-scene>
        {/* @ts-expect-error: old ahh library */}
        <a-entity
          position="0 -1 -3"
          scale="2 2 2"
          rotation="0 180 0"
          gltf-model="/garden.gltf"
        >
          {/* @ts-expect-error: old ahh library */}
        </a-entity>
        {/* @ts-expect-error: old ahh library */}
      </a-scene>
    </div>
  );
}
