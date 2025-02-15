"use client";

import React, { useEffect, useRef, useState } from "react";
import "aframe";
export default function YogaStudio() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
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

      {/* AR Scene Overlaid on Camera */}

      <a-scene
        embedded
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Plant Model - Adjusted for Full-Screen Yoga Studio Look */}
        <a-entity
          position="0 -1 -3"
          scale="2 2 2"
          rotation="0 180 0"
          gltf-model="/garden.gltf"
        ></a-entity>
      </a-scene>
    </div>
  );
}
