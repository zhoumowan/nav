"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { SpotlightCard } from "@/components/effects/Spotlight";
import { Star, ExternalLink } from "lucide-react";
import type { Site } from "@/types";

interface FeaturedSectionProps {
  sites: Site[];
}

export function FeaturedSection({ sites }: FeaturedSectionProps) {
  const featured = sites.filter((s) => s.featured).slice(0, 6);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Featured
              </h2>
              <p className="text-sm text-muted-foreground">Editor&apos;s picks this week</p>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((site, index) => (
            <FeaturedCard key={site.id} site={site} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ site, index }: { site: Site; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <SpotlightCard className="rounded-xl p-5 h-full group">
        <div className="relative space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground border border-border/20">
                {site.title.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium text-sm text-foreground group-hover:text-foreground transition-colors">
                  {site.title}
                </h3>
                <span className="text-[10px] text-muted-foreground">{site.category}</span>
              </div>
            </div>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {site.description}
          </p>

          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-500 transition-colors"
          >
            Visit
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
