"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Command, ExternalLink, ArrowUpRight, X } from "lucide-react";
import type { Site, Category } from "@/types";
import { CATEGORIES } from "@/types";

interface CommandMenuProps {
  sites: Site[];
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: Category | null) => void;
}

export function CommandMenu({ sites, isOpen, onClose, onSelectCategory }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSites, setRecentSites] = useState<Site[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent sites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dev-os-recent");
      if (stored) {
        const recentIds = JSON.parse(stored) as string[];
        const recent = recentIds
          .map((id) => sites.find((s) => s.id === id))
          .filter(Boolean) as Site[];
        setRecentSites(recent.slice(0, 5));
      }
    } catch {
      // ignore
    }
  }, [sites]);

  const filteredSites = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return sites.filter(
      (site) =>
        site.title.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.tags.some((t) => t.toLowerCase().includes(q)) ||
        site.category.toLowerCase().includes(q)
    );
  }, [sites, query]);

  const categories = React.useMemo(() => {
    return CATEGORIES.map((c) => c.id);
  }, []);

  const results = query.trim() ? filteredSites : recentSites;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const site = results[selectedIndex];
        if (site) {
          handleSelect(site);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (site: Site) => {
      try {
        const stored = localStorage.getItem("dev-os-recent");
        const recentIds = stored ? (JSON.parse(stored) as string[]) : [];
        const updated = [site.id, ...recentIds.filter((id) => id !== site.id)].slice(0, 10);
        localStorage.setItem("dev-os-recent", JSON.stringify(updated));
      } catch {
        // ignore
      }
      window.open(site.url, "_blank");
      onClose();
    },
    [onClose]
  );

  const handleCategorySelect = useCallback(
    (category: Category) => {
      onSelectCategory(category);
      onClose();
    },
    [onSelectCategory, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] sm:pt-[15vh]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl mx-4 glass-elevated rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border/20">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resources, tags, categories..."
                className="flex-1 bg-transparent text-foreground placeholder-muted-foreground text-sm outline-none min-w-0"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded hover:bg-muted text-muted-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/80 text-[10px] text-muted-foreground border border-border/20">
                  <Command className="w-3 h-3" />
                  K
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
              {results.length === 0 && query.trim() && (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm text-muted-foreground">No results found for &quot;{query}&quot;</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {query.trim() ? "Results" : "Recent"}
                  </div>
                  {results.map((site, index) => (
                    <button
                      key={site.id}
                      onClick={() => handleSelect(site)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        selectedIndex === index
                          ? "bg-blue-500/10"
                          : "hover:bg-muted/30"
                      )}
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground border border-border/20 flex-shrink-0">
                        {site.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-foreground">
                            {site.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/20">
                            {site.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{site.description}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Categories shortcut */}
              {!query.trim() && (
                <div className="py-2 border-t border-border/20">
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Categories
                  </div>
                  <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors text-left"
                      >
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="hidden sm:flex items-center justify-between px-4 py-2.5 border-t border-border/20 bg-muted/30">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/20">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/20">↵</kbd>
                  Open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border/20">esc</kbd>
                  Close
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {sites.length} resources
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
