"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import "aframe";

export default function YogaStudio() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Access the user's camera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } }) // Use back camera
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Camera access error:", err));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Head>
        <title>Yoga Studio AR</title>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
      </Head>

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
      <a-scene embedded>
        {/* Yoga Mat */}
        <a-box
          position="0 0 -2"
          width="2"
          height="0.1"
          depth="1"
          color="purple"
        />

        {/* Instructor (Replace with a 3D Model) */}
        <a-entity
          position="0 1 -3"
          scale="0.5 0.5 0.5"
          gltf-model="https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/AnimatedMorphCube/glTF/AnimatedMorphCube.gltf"
          animation-mixer
        ></a-entity>

        {/* Floor */}
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="green"
        />
      </a-scene>
    </div>
  );
}
