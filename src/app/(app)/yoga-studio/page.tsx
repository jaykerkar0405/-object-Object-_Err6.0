"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene").then((mod) => mod.Scene), {
  ssr: false,
});

export default function YogaStudio() {
  return <Scene />;
}
