"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { NumberTicker } from "@/components/effects/NumberTicker";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import type { Site } from "@/types";
import { CATEGORIES } from "@/types";

interface StatsSectionProps {
  sites: Site[];
}

export function StatsSection({ sites }: StatsSectionProps) {
  const totalSites = sites.length;
  const totalCategories = CATEGORIES.length;
  const totalTags = new Set(sites.flatMap((s) => s.tags)).size;

  const stats: Array<{ label: string; value: number; suffix?: string }> = [
    { label: "Resources", value: totalSites },
    { label: "Categories", value: totalCategories },
    { label: "Tags", value: totalTags },
  ];

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="relative glass rounded-2xl p-8 sm:p-10">
            {/* Stats row */}
            <div className="grid grid-cols-3 mb-8 pb-8 border-b border-border/20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Open Source</h3>
                  <p className="text-xs text-muted-foreground">
                    Built for the community, by the community
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Star on GitHub
                </motion.a>
                <motion.button
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border/30 text-muted-foreground text-xs font-medium hover:text-foreground hover:border-border/60 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
