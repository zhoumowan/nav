"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";

import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 64,
  height = 64,
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setDims((prev) => {
          // Only update if size actually changed by >2px to avoid thrashing
          if (Math.abs(prev.w - w) < 2 && Math.abs(prev.h - h) < 2) return prev;
          return { w, h };
        });
      }, 150);
    });

    ro.observe(el);
    // Initial measure without debounce
    const rect = el.getBoundingClientRect();
    setDims({ w: rect.width, h: rect.height });

    return () => {
      ro.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const horizontal = Math.ceil(dims.w / width);
  const vertical = Math.ceil(dims.h / height);

  const squares = useMemo(() => {
    const total = horizontal * vertical;
    if (total <= 0) return [];
    return Array.from({ length: total }, (_, index) => ({
      key: index,
      x: (index % horizontal) * width,
      y: Math.floor(index / horizontal) * height,
    }));
  }, [horizontal, vertical, width, height]);

  const handleEnter = useCallback((index: number) => {
    setHoveredSquare(index);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredSquare(null);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg
        width={dims.w}
        height={dims.h}
        className={cn("h-full w-full", className)}
        {...props}
      >
        {squares.map((sq) => (
          <rect
            key={sq.key}
            x={sq.x}
            y={sq.y}
            width={width}
            height={height}
            className={cn(
              "transition-all duration-100 ease-in-out not-[&:hover]:duration-1000",
              hoveredSquare === sq.key
                ? "fill-blue-400/25 dark:fill-blue-400/35"
                : "fill-transparent",
              squaresClassName
            )}
            style={{
              stroke: "rgba(148, 163, 184, 0.35)",
              strokeWidth: 1,
            }}
            onMouseEnter={() => handleEnter(sq.key)}
            onMouseLeave={handleLeave}
          />
        ))}
      </svg>
    </div>
  );
}
