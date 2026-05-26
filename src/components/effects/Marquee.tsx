"use client";

import React, { useRef, useEffect, useState, useCallback, Children, cloneElement } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  fade?: boolean;
  fadeWidth?: number;
}

export function Marquee({
  children,
  className,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  fade = true,
  fadeWidth = 60,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [contentWidth, setContentWidth] = useState(0);

  // Clone children with unique keys for the duplicated set
  const originalItems = Children.toArray(children);
  const clonedItems = originalItems.map((child, i) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        ...child.props,
        key: `marquee-clone-${i}`,
      });
    }
    return child;
  });

  // Measure half-width of duplicated content
  useEffect(() => {
    if (trackRef.current) {
      setContentWidth(trackRef.current.scrollWidth / 2);
    }
  }, [children]);

  // Auto-scroll animation loop
  useEffect(() => {
    if (contentWidth === 0 || isDragging) return;

    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        const pixelsPerMs = speed / 1000;
        if (direction === "left") {
          positionRef.current -= delta * pixelsPerMs;
        } else {
          positionRef.current += delta * pixelsPerMs;
        }

        // Loop position
        if (contentWidth > 0) {
          positionRef.current =
            ((positionRef.current % contentWidth) + contentWidth) % contentWidth;
          if (direction === "left") {
            positionRef.current -= contentWidth;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [contentWidth, speed, direction, isPaused, isDragging]);

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      startXRef.current = e.pageX;
      scrollLeftRef.current = positionRef.current;
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const walk = e.pageX - startXRef.current;
      let newX = scrollLeftRef.current + walk;

      if (contentWidth > 0) {
        newX = ((newX % contentWidth) + contentWidth) % contentWidth;
        if (direction === "left") newX -= contentWidth;
      }

      positionRef.current = newX;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${newX}px)`;
      }
    },
    [isDragging, contentWidth, direction]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel horizontal scroll
  useEffect(() => {
    const container = trackRef.current?.parentElement;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        let newX = positionRef.current - e.deltaY;

        if (contentWidth > 0) {
          newX = ((newX % contentWidth) + contentWidth) % contentWidth;
          if (direction === "left") newX -= contentWidth;
        }

        positionRef.current = newX;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${newX}px)`;
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [contentWidth, direction]);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => pauseOnHover && !isDragging && setIsPaused(true)}
      onMouseLeave={() => {
        pauseOnHover && setIsPaused(false);
        handleMouseUp();
      }}
    >
      {/* Fade edges — mask-image avoids any background color overlay */}
      {fade && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            maskImage: `linear-gradient(to right, transparent 0px, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`,
            WebkitMaskImage: `linear-gradient(to right, transparent 0px, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent 100%)`,
          }}
        />
      )}

      {/* Scroll container with padding to prevent clip on hover/scale */}
      <div
        className={cn(
          "overflow-hidden py-3",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={trackRef}
          className="flex flex-shrink-0 will-change-transform gap-3"
          style={{
            width: "max-content",
          }}
        >
          {originalItems}
          {clonedItems}
        </div>
      </div>
    </div>
  );
}
