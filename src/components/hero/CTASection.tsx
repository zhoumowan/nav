"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionReveal } from "@/components/effects/SectionReveal";
import { SpotlightCard } from "@/components/effects/Spotlight";
import { ArrowRight, Code2, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionReveal>
          <SpotlightCard className="rounded-2xl p-8 sm:p-12 text-center">
            <div className="relative space-y-6">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Open Source</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Built for the community,
                <br />
                <span className="text-gradient">by the community</span>
              </h2>

              <p className="text-muted-foreground max-w-lg mx-auto">
                Nav is an open-source project. Contribute your favorite tools,
                suggest improvements, or fork it for your own workspace.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Code2 className="w-4 h-4" />
                  Star on GitHub
                </motion.a>
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit a Resource
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </SpotlightCard>
        </SectionReveal>
      </div>
    </section>
  );
}
