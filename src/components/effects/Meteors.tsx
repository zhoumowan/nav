"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = new Array(number).fill(true);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((_, idx) => {
        const meteorCount = Math.ceil(Math.random() * 20);
        const left = Math.floor(Math.random() * (400 - -400) + -400);
        const top = Math.floor(Math.random() * (300 - -300) + -300);
        const delay = Math.random() * (0.8 - 0.2) + 0.2;
        const duration = Math.floor(Math.random() * (10 - 2) + 2);

        return (
          <span
            key={idx}
            className={cn(
              "absolute h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-neutral-400 shadow-[0_0_0_1px_#ffffff10]",
              "animate-meteor"
            )}
            style={{
              top: `${top}px`,
              left: `${left}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 h-[1px] w-[50px] bg-gradient-to-r from-neutral-400 to-transparent" />
          </span>
        );
      })}
    </div>
  );
}
