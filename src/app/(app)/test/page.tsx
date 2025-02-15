"use client";

import { useRef } from "react";

export default function TestPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  async function generateAndPlaySpeech() {
    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: "Hello world" }),
      });

      const { audioUrl } = await response.json();

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  return (
    <div>
      <button onClick={generateAndPlaySpeech}>Generate and Play Speech</button>
      <audio ref={audioRef} />
    </div>
  );
}
