"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none aurora-bg", className)}>
      <div
        className="absolute -inset-[100%] opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(96,165,250,0.08), transparent),
            radial-gradient(ellipse 50% 60% at 20% 80%, rgba(59,130,246,0.06), transparent)
          `,
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 blur-[60px]"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
