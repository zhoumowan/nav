"use client";

import React, { useMemo } from "react";
import { SiteCard } from "./SiteCard";
import type { Site } from "@/types";

interface MasonryGridProps {
  sites: Site[];
}

export function MasonryGrid({ sites }: MasonryGridProps) {
  // Distribute items into 3 columns for masonry effect
  const columns = useMemo(() => {
    const cols: Site[][] = [[], [], []];
    sites.forEach((site, i) => {
      cols[i % 3].push(site);
    });
    return cols;
  }, [sites]);

  if (sites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border/20 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No results found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or category filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {column.map((site, index) => (
            <SiteCard
              key={site.id}
              site={site}
              index={colIndex * 3 + index}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
