"use client";

import dynamic from "next/dynamic";

// @ts-expect-error: maa chuda na pls
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
});

export default function YogaStudio() {
  return <Scene />;
}
