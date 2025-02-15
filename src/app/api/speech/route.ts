import { ElevenLabsClient } from "elevenlabs";
import { NextResponse } from "next/server";
import { Readable } from "stream";

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const client = new ElevenLabsClient({
      apiKey: process.env.ELEVENLABS_API_KEY!,
    });

    // Get available voices first
    const voices = await client.voices.getAll();
    const defaultVoice = voices.voices[0]; // Use the first available voice

    if (!defaultVoice) {
      throw new Error("No voices available");
    }

    const audioStream = await client.textToSpeech.convert(
      defaultVoice.voice_id,
      {
        text,
        model_id: "eleven_multilingual_v2",
        output_format: "mp3_44100_128",
      }
    );
    
    const audioBuffer = await streamToBuffer(
      audioStream as unknown as Readable
    );
    const audioBase64 = audioBuffer.toString("base64");

    return NextResponse.json({
      audioUrl: `data:audio/mpeg;base64,${audioBase64}`,
    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to generate speech", details: error },
      { status: 500 }
    );
  }
}
