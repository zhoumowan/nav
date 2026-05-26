"use client";

import { useState, useEffect, useCallback } from "react";

const BOOKMARKS_KEY = "dev-os-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        setBookmarks(new Set(JSON.parse(stored)));
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  const saveBookmarks = useCallback((newBookmarks: Set<string>) => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(newBookmarks)));
  }, []);

  const toggleBookmark = useCallback(
    (id: string) => {
      setBookmarks((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        saveBookmarks(next);
        return next;
      });
    },
    [saveBookmarks]
  );

  const isBookmarked = useCallback(
    (id: string) => bookmarks.has(id),
    [bookmarks]
  );

  return { bookmarks, toggleBookmark, isBookmarked, mounted };
}
