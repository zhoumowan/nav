"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Search, Bookmark, Code2 } from "lucide-react";

interface DockMenuProps {
  onSearchClick: () => void;
  onBookmarkClick: () => void;
  onHomeClick: () => void;
  isBookmarkFilter: boolean;
}

const dockItems: Array<{ icon: any; label: string; action?: string; href?: string }> = [
  { icon: Home, label: "Home", action: "home" },
  { icon: Search, label: "Search", action: "search" },
  { icon: Bookmark, label: "Bookmarks", action: "bookmarks" },
  { icon: Code2, label: "GitHub", href: "https://github.com" },
];

export function DockMenu({ onSearchClick, onBookmarkClick, onHomeClick, isBookmarkFilter }: DockMenuProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-4 top-1/2 -translate-y-1/2 sm:right-6 z-50"
    >
      <div className="flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-2xl glass-elevated shadow-2xl overflow-y-auto scrollbar-hide">
        {dockItems.map((item) => (
          <DockItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={item.action === "bookmarks" && isBookmarkFilter}
            onClick={() => {
              if (item.action === "home") {
                onHomeClick();
              } else if (item.action === "search") {
                onSearchClick();
              } else if (item.action === "bookmarks") {
                onBookmarkClick();
              } else if (item.href?.startsWith("http")) {
                window.open(item.href, "_blank");
              } else if (item.href) {
                window.location.hash = item.href;
              }
            }}
          />
        ))}

      </div>
    </motion.div>
  );
}

function DockItem({
  icon: Icon,
  label,
  onClick,
  isActive,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl shrink-0",
        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "transition-colors duration-200",
        isActive && "text-blue-400 bg-blue-500/10"
      )}
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
      <span className="absolute left-auto right-12 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-card text-[10px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/20 pointer-events-none hidden sm:block">
        {label}
      </span>
    </motion.button>
  );
}
