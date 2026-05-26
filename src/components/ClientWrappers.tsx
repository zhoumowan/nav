"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { CategoryScroll } from "@/components/navigation/CategoryScroll";
import { MasonryGrid } from "@/components/masonry/MasonryGrid";
import { CommandMenu } from "@/components/search/CommandMenu";
import { DockMenu } from "@/components/navigation/DockMenu";
import { FeaturedSection } from "@/components/hero/FeaturedSection";
import { StatsSection } from "@/components/hero/StatsSection";
import { CTASection } from "@/components/hero/CTASection";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Site, Category } from "@/types";

// Shared state hook for cross-island communication
function useSharedFilter() {
  const [activeCategory, setActiveCategoryState] = useState<Category | null>(null);
  const [searchQuery, setSearchQueryState] = useState("");
  const [bookmarkFilter, setBookmarkFilterState] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail?.category !== undefined) {
        setActiveCategoryState(e.detail.category);
      }
      if (e.detail?.query !== undefined) {
        setSearchQueryState(e.detail.query);
      }
      if (e.detail?.bookmarkFilter !== undefined) {
        setBookmarkFilterState(e.detail.bookmarkFilter);
      }
    };
    window.addEventListener("devos-filter" as any, handler);
    return () => window.removeEventListener("devos-filter" as any, handler);
  }, []);

  const setActiveCategory = useCallback((category: Category | null) => {
    setActiveCategoryState(category);
    window.dispatchEvent(new CustomEvent("devos-filter", { detail: { category } }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
    window.dispatchEvent(new CustomEvent("devos-filter", { detail: { query } }));
  }, []);

  const setBookmarkFilter = useCallback((enabled: boolean) => {
    setBookmarkFilterState(enabled);
    window.dispatchEvent(new CustomEvent("devos-filter", { detail: { bookmarkFilter: enabled } }));
  }, []);

  return { activeCategory, searchQuery, bookmarkFilter, setActiveCategory, setSearchQuery, setBookmarkFilter };
}

function useFilteredSites(sites: Site[]) {
  const { activeCategory, searchQuery, bookmarkFilter } = useSharedFilter();
  const { isBookmarked, mounted } = useBookmarks();

  return useMemo(() => {
    let filtered = sites;

    if (bookmarkFilter && mounted) {
      filtered = filtered.filter((site) => isBookmarked(site.id));
    }

    if (activeCategory !== null) {
      filtered = filtered.filter((site) => site.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (site) =>
          site.title.toLowerCase().includes(query) ||
          site.description.toLowerCase().includes(query) ||
          site.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          site.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [sites, activeCategory, searchQuery, bookmarkFilter, isBookmarked, mounted]);
}

export function CategoryScrollWrapper({ sites }: { sites: Site[] }) {
  const { activeCategory, setActiveCategory } = useSharedFilter();

  return (
    <CategoryScroll
      activeCategory={activeCategory}
      onCategoryChange={setActiveCategory}
    />
  );
}

export function MasonryGridWrapper({ sites }: { sites: Site[] }) {
  const filteredSites = useFilteredSites(sites);
  return <MasonryGrid sites={filteredSites} />;
}

export function CommandMenuWrapper({ sites }: { sites: Site[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveCategory } = useSharedFilter();

  const handleSelectCategory = useCallback((category: Category | null) => {
    setActiveCategory(category);
    const el = document.getElementById("resources");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [setActiveCategory]);

  useEffect(() => {
    const handler = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-command" as any, handler);
    return () => window.removeEventListener("toggle-command" as any, handler);
  }, []);

  return (
    <CommandMenu
      sites={sites}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSelectCategory={handleSelectCategory}
    />
  );
}

export function DockMenuWrapper() {
  const { activeCategory, bookmarkFilter, setActiveCategory, setBookmarkFilter, setSearchQuery } = useSharedFilter();

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent("toggle-command"));
  };

  const handleBookmarkClick = () => {
    setBookmarkFilter(!bookmarkFilter);
  };

  const handleHomeClick = () => {
    if (activeCategory !== null) setActiveCategory(null);
    if (bookmarkFilter) setBookmarkFilter(false);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DockMenu
      onSearchClick={handleSearchClick}
      onBookmarkClick={handleBookmarkClick}
      onHomeClick={handleHomeClick}
      isBookmarkFilter={bookmarkFilter}
    />
  );
}

export function FeaturedSectionWrapper({ sites }: { sites: Site[] }) {
  return <FeaturedSection sites={sites} />;
}

export function StatsSectionWrapper({ sites }: { sites: Site[] }) {
  return <StatsSection sites={sites} />;
}

export function CTASectionWrapper() {
  return <CTASection />;
}
