"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ExternalLink, Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Site } from "@/types";

interface SiteCardProps {
  site: Site;
  index: number;
}

export function SiteCard({ site, index }: SiteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isBookmarked, toggleBookmark, mounted } = useBookmarks();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const bookmarked = mounted ? isBookmarked(site.id) : false;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const getInitials = (title: string) => {
    return title
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      AI: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      Frontend: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      Backend: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      Design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      Tools: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
      "Open Source": "bg-green-500/10 text-green-400 border-green-500/20",
      Deployment: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    };
    return colors[category] || colors.Tools;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative rounded-xl border border-border/40 bg-card/40",
        "hover:border-primary/20",
        "transition-all duration-300 ease-out",
        "overflow-hidden"
      )}
      style={{
        boxShadow: isHovered
          ? "0 0 40px -10px rgba(59,130,246,0.15), 0 8px 24px -8px rgba(0,0,0,0.1)"
          : "0 0 0 0 transparent",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Mouse-following glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none",
          isHovered && "opacity-100"
        )}
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.08), transparent 40%)`,
        }}
      />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
                "bg-muted text-muted-foreground border border-border/40"
              )}
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {site.icon ? (
                <img
                  src={site.icon}
                  alt={site.title}
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                />
              ) : (
                getInitials(site.title)
              )}
            </motion.div>
            <div>
              <h3 className="font-medium text-sm text-foreground group-hover:text-foreground transition-colors">
                {site.title}
              </h3>
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border mt-1",
                  getCategoryColor(site.category)
                )}
              >
                {site.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1" />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 group-hover:text-foreground/80 transition-colors">
          {site.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {site.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-md bg-muted/60 text-muted-foreground border border-border/20 group-hover:bg-muted/80 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              toggleBookmark(site.id);
            }}
            className={cn(
              "p-1.5 rounded-lg transition-colors",
              bookmarked
                ? "text-blue-400 bg-blue-500/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark
              className={cn("w-3.5 h-3.5", bookmarked && "fill-current")}
            />
          </motion.button>

          <motion.a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
              "text-xs font-medium text-muted-foreground",
              "bg-muted/50 border border-border/20",
              "hover:bg-muted hover:text-foreground hover:border-border/40",
              "transition-all duration-200"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Visit
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
