"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the R3F Canvas to ensure 0 SSR friction with WebGL
const LivingBackground3D = dynamic(
  () => import("@/components/canvas/LivingBackground3D"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function LivingCanvas() {
  return <LivingBackground3D />;
}
