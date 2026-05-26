"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  className?: string;
  delay?: number;
  duration?: number;
  path?: string;
}

export function AnimatedBeam({
  className,
  delay = 0,
  duration = 4,
  path = "M0,50 Q50,0 100,50 T200,50",
}: AnimatedBeamProps) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d={path}
        fill="none"
        stroke="url(#beam-gradient)"
        strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
        transition={{
          pathLength: { duration, ease: "easeInOut" },
          opacity: { duration, times: [0, 0.5, 1] },
          delay,
        }}
      />
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59,130,246,0)" />
          <stop offset="50%" stopColor="rgba(59,130,246,0.5)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
