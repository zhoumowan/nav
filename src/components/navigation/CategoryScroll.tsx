"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { deriveCategories, type CategoryItem, type Category, type Site } from "@/types";
import { Icon } from "@iconify/react";
import { Marquee } from "@/components/effects/Marquee";

interface CategoryScrollProps {
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
  sites: Site[];
}

export function CategoryScroll({ activeCategory, onCategoryChange, sites }: CategoryScrollProps) {
  return (
    <div className="relative w-full">
      <Marquee speed={40} pauseOnHover fade fadeWidth={60}>
        {deriveCategories(sites).map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <CategoryPill
              key={cat.id}
              cat={cat}
              isActive={isActive}
              onClick={() =>
                onCategoryChange(isActive ? null : cat.id)
              }
            />
          );
        })}
      </Marquee>
    </div>
  );
}

function CategoryPill({
  cat,
  isActive,
  onClick,
}: {
  cat: CategoryItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl",
        "text-sm font-medium select-none",
        "border",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-1",
        isActive
          ? "bg-foreground text-background border-foreground shadow-lg shadow-foreground/5"
          : "bg-muted/50 text-muted-foreground border-border/20 hover:border-blue-500/30 hover:text-foreground hover:bg-muted/80 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.15)]"
      )}
      whileTap={{ scale: 0.95 }}
      layout
    >
      {/* Glow ring on hover */}
      {!isActive && (
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500/20 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Active background */}
      {isActive && (
        <motion.div
          layoutId="activeCategory"
          className="absolute inset-0 rounded-xl bg-foreground"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <span className="relative z-10 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
        <Icon icon={cat.icon} className="w-4 h-4" />
      </span>
      <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
    </motion.button>
  );
}
