"use client";

import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/effects/Typewriter";
import { Spotlight } from "@/components/effects/Spotlight";
import { AuroraBackground } from "@/components/effects/Aurora";
import { GridPattern } from "@/components/effects/GridPattern";
import { BlurOrb } from "@/components/effects/BlurOrb";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Terminal, Zap, Globe, Code2, Palette } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <AuroraBackground />
      <div className="absolute inset-0 opacity-40">
        <GridPattern
          width={60}
          height={60}
          x={-1}
          y={-1}
          strokeDasharray="4 4"
        />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="rgba(59,130,246,0.15)" />
      
      {/* Floating Orbs */}
      <BlurOrb
        className="top-1/4 right-1/4"
        color="rgba(59,130,246,0.12)"
        size={300}
        duration={15}
      />
      <BlurOrb
        className="bottom-1/4 left-1/4"
        color="rgba(96,165,250,0.08)"
        size={250}
        duration={18}
        delay={2}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 lg:space-y-8 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Developer Workspace v2.0</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-gradient-animated">Build Your</span>
            <br />
            <span className="text-foreground">Digital Universe</span>
          </h1>

          <div className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 h-14 sm:h-16">
            <Typewriter
              words={[
                "Everything for modern developers.",
                "Curated tools, resources, and inspiration.",
                "Your personal operating system for creation.",
              ]}
              className="text-foreground/80"
              typingSpeed={60}
              deletingSpeed={30}
              pauseDuration={2500}
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <motion.a
              href="#resources"
              className={cn(
                "group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg",
                "bg-foreground text-background font-medium text-sm",
                "hover:bg-foreground/90 transition-colors duration-200"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Resources
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
            <motion.button
              className={cn(
                "inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg",
                "glass text-sm font-medium text-muted-foreground",
                "hover:text-foreground transition-colors duration-200"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-command"))}
            >
              <Terminal className="w-4 h-4" />
              Open Command
            </motion.button>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 pt-2 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {[
                "bg-blue-500",
                "bg-blue-400",
                "bg-blue-300",
                "bg-blue-200",
              ].map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-background",
                    color
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">40+</span> resources curated
            </p>
          </div>
        </motion.div>

        {/* Right Column - Floating Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block h-[500px]"
        >
          <FloatingCard
            className="absolute top-4 right-20 w-56"
            delay={0.3}
            icon={<Zap className="w-5 h-5 text-yellow-400" />}
            title="AI Tools"
            description="ChatGPT, Claude, Midjourney & more"
            tags={["LLM", "Image", "Code"]}
            gradient="from-yellow-500/10 to-transparent"
          />
          <FloatingCard
            className="absolute top-40 left-4 w-56"
            delay={0.5}
            icon={<Code2 className="w-5 h-5 text-emerald-400" />}
            title="Dev Stack"
            description="Next.js, Astro, Tailwind, Prisma"
            tags={["React", "CSS", "DB"]}
            gradient="from-emerald-500/10 to-transparent"
          />
          <FloatingCard
            className="absolute bottom-40 right-4 w-56"
            delay={0.7}
            icon={<Palette className="w-5 h-5 text-blue-400" />}
            title="Design System"
            description="Figma, Framer, shadcn/ui"
            tags={["UI", "Motion", "Component"]}
            gradient="from-blue-500/10 to-transparent"
          />
          <FloatingCard
            className="absolute bottom-4 left-20 w-56"
            delay={0.9}
            icon={<Globe className="w-5 h-5 text-purple-400" />}
            title="DevOps"
            description="Docker, K8s, Vercel, AWS"
            tags={["Cloud", "CI/CD", "Edge"]}
            gradient="from-purple-500/10 to-transparent"
          />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

function FloatingCard({
  className,
  delay,
  icon,
  title,
  description,
  tags,
  gradient,
}: {
  className?: string;
  delay: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !glowRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty("--glow-x", `${x}px`);
    glowRef.current.style.setProperty("--glow-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass rounded-xl p-4 group relative overflow-hidden",
        "hover:border-blue-500/20 transition-colors duration-300",
        className
      )}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-following glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(280px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(59,130,246,0.18), transparent 60%)",
        }}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
          gradient
        )}
      />
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/50">{icon}</div>
          <div>
            <h3 className="font-medium text-sm text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full bg-muted/50 text-muted-foreground border border-border/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
