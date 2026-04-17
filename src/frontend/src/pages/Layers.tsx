import { SkeletonLayerRow } from "@/components/ui/SkeletonCard";
import { useLayers } from "@/hooks/useAios";
import type { Layer } from "@/types/aios";
import { AlertCircle, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

// ── Layer visual config ────────────────────────────────────────────────────────

interface LayerConfig {
  hue: number;
  chroma: number;
  description: string;
  icon: string;
}

const LAYER_CONFIG: Record<string, LayerConfig> = {
  context: {
    hue: 193,
    chroma: 0.18,
    description:
      "Your business identity, goals, and operating environment — the foundation every other layer depends on.",
    icon: "◈",
  },
  data: {
    hue: 255,
    chroma: 0.16,
    description:
      "Structured and unstructured data flows, integrations, and knowledge stores that power decision-making.",
    icon: "◉",
  },
  intelligence: {
    hue: 290,
    chroma: 0.18,
    description:
      "Model training, reasoning pipelines, and adaptive learning calibrated to your specific business context.",
    icon: "◎",
  },
  automate: {
    hue: 45,
    chroma: 0.2,
    description:
      "Workflow automation, agent orchestration, and trigger-based execution that eliminates manual toil.",
    icon: "◑",
  },
  build: {
    hue: 155,
    chroma: 0.18,
    description:
      "Custom tooling, integrations, and bespoke capabilities constructed on top of your live AIOS stack.",
    icon: "◐",
  },
};

const LAYER_ORDER = ["context", "data", "intelligence", "automate", "build"];

function sortLayers(layers: Layer[]): Layer[] {
  return [...layers].sort((a, b) => {
    const ai = LAYER_ORDER.indexOf(a.id.toLowerCase());
    const bi = LAYER_ORDER.indexOf(b.id.toLowerCase());
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

// ── Progress bar ──────────────────────────────────────────────────────────────

interface ProgressBarProps {
  pct: number;
  hue: number;
  chroma: number;
  index: number;
}

function ProgressBar({ pct, hue, chroma, index }: ProgressBarProps) {
  return (
    <div
      className="relative h-2.5 rounded-full overflow-hidden"
      style={{ backgroundColor: `oklch(0.22 0.03 ${hue})` }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(to right, oklch(0.62 ${chroma} ${hue}), oklch(0.80 ${chroma * 0.7} ${hue}))`,
          boxShadow: `0 0 12px oklch(0.70 ${chroma} ${hue} / 0.45)`,
        }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{
          duration: 1.0,
          delay: index * 0.12,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </div>
  );
}

// ── Dependency connector ──────────────────────────────────────────────────────

function DependencyConnector({
  fromHue,
  toHue,
}: { fromHue: number; toHue: number }) {
  const midHue = Math.round((fromHue + toHue) / 2);
  return (
    <div className="relative flex justify-center py-1" aria-hidden="true">
      <div
        className="absolute w-px h-full top-0"
        style={{
          background: `linear-gradient(to bottom, oklch(0.40 0.06 ${fromHue} / 0.35), oklch(0.40 0.06 ${toHue} / 0.35))`,
        }}
      />
      <ChevronDown
        size={14}
        style={{ color: `oklch(0.42 0.05 ${midHue})` }}
        className="relative z-10 bg-background rounded-full"
      />
    </div>
  );
}

// ── Single layer row ──────────────────────────────────────────────────────────

interface LayerRowProps {
  layer: Layer;
  config: LayerConfig;
  index: number;
  isLast: boolean;
}

function LayerRow({ layer, config, index, isLast }: LayerRowProps) {
  const pct = Number(layer.completionPct);
  const { hue, chroma } = config;

  return (
    <motion.div
      data-ocid={`layers.item.${index + 1}`}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="rounded-xl border p-5 transition-smooth"
        style={{
          backgroundColor: `oklch(0.165 ${chroma * 0.15} ${hue} / 0.6)`,
          borderColor: `oklch(0.35 ${chroma * 0.5} ${hue} / 0.35)`,
        }}
      >
        <div className="flex items-start gap-4">
          {/* Icon badge */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{
              backgroundColor: `oklch(0.22 ${chroma * 0.4} ${hue})`,
              color: `oklch(0.78 ${chroma} ${hue})`,
            }}
            aria-hidden="true"
          >
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name + status + pct */}
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <h3
                  className="text-base font-semibold font-display truncate"
                  style={{ color: `oklch(0.78 ${chroma} ${hue})` }}
                >
                  {layer.name}
                </h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{
                    color: `oklch(0.78 ${chroma} ${hue})`,
                    backgroundColor: `oklch(0.22 ${chroma * 0.4} ${hue})`,
                    border: `1px solid oklch(0.45 ${chroma * 0.5} ${hue} / 0.4)`,
                  }}
                >
                  {layer.statusLabel}
                </span>
              </div>
              <span
                className="text-lg font-bold font-mono tabular-nums flex-shrink-0"
                style={{ color: `oklch(0.78 ${chroma} ${hue})` }}
              >
                {pct}%
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {config.description}
            </p>

            {/* Progress bar */}
            <ProgressBar pct={pct} hue={hue} chroma={chroma} index={index} />
          </div>
        </div>
      </div>

      {/* Dependency arrow between layers */}
      {!isLast && (
        <DependencyConnector
          fromHue={hue}
          toHue={LAYER_CONFIG[LAYER_ORDER[index + 1]]?.hue ?? hue}
        />
      )}
    </motion.div>
  );
}

// ── Overall progress ring ─────────────────────────────────────────────────────

function OverallProgress({ layers }: { layers: Layer[] }) {
  const avg =
    layers.length > 0
      ? Math.round(
          layers.reduce((s, l) => s + Number(l.completionPct), 0) /
            layers.length,
        )
      : 0;
  const r = 38;
  const circ = 2 * Math.PI * r;

  return (
    <motion.div
      className="flex items-center gap-5 p-5 rounded-xl border"
      style={{
        backgroundColor: "oklch(0.175 0.03 195 / 0.4)",
        borderColor: "oklch(0.35 0.08 195 / 0.3)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ring */}
      <div className="flex-shrink-0 relative w-20 h-20">
        <svg
          viewBox="0 0 88 88"
          className="w-20 h-20 -rotate-90"
          role="img"
          aria-labelledby="ring-title"
        >
          <title id="ring-title">
            Overall AIOS stack readiness progress ring
          </title>
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.62 0.18 193)" />
              <stop offset="100%" stopColor="oklch(0.78 0.14 195)" />
            </linearGradient>
          </defs>
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="oklch(0.22 0.04 195)"
            strokeWidth="7"
          />
          <motion.circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - (avg / 100) * circ }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-foreground">
          {avg}%
        </span>
      </div>

      {/* Text */}
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
          Overall Progress
        </div>
        <div className="text-xl font-bold font-display text-foreground">
          AIOS Stack Readiness
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {layers.filter((l) => Number(l.completionPct) >= 80).length} of{" "}
          {layers.length} layers at operational threshold
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LayersPage() {
  const { data: layers, isLoading, isError } = useLayers();
  const sorted = layers ? sortLayers(layers) : [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-ocid="layers.page">
      {/* Header */}
      <div className="section-header" data-ocid="layers.section">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1">
            Infrastructure
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground">
            Five Layers Overview
          </h1>
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">
          Foundation → Intelligence → Capability
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3" data-ocid="layers.loading_state">
          {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
            <SkeletonLayerRow key={sk} />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl border text-sm"
          style={{
            backgroundColor: "oklch(0.16 0.06 24 / 0.15)",
            borderColor: "oklch(0.45 0.1 24 / 0.3)",
            color: "oklch(0.78 0.14 24)",
          }}
          data-ocid="layers.error_state"
        >
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>Unable to load layer data. Showing last known state.</span>
        </div>
      )}

      {/* Layers */}
      {!isLoading && sorted.length > 0 && (
        <div>
          {/* Summary ring */}
          <div className="mb-6">
            <OverallProgress layers={sorted} />
          </div>

          {/* Intro copy */}
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Each layer of the AIOS stack builds on the one below it. Context
            must be established before Data can be leveraged; Intelligence
            requires rich Data; Automate demands proven Intelligence; and Build
            sits at the apex, unlocking fully custom capabilities.
          </p>

          {/* Stacked layer rows */}
          <div>
            {sorted.map((layer, index) => {
              const key = layer.id.toLowerCase();
              const config: LayerConfig = LAYER_CONFIG[key] ?? {
                hue: 220,
                chroma: 0.12,
                description: "",
                icon: "○",
              };
              return (
                <LayerRow
                  key={layer.id}
                  layer={layer}
                  config={config}
                  index={index}
                  isLast={index === sorted.length - 1}
                />
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            className="mt-6 pt-5 border-t flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
            style={{ borderColor: "oklch(var(--border) / 0.2)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="uppercase tracking-wider font-medium">
              Layer maturity:
            </span>
            {[
              { label: "Planned", range: "0–25%", dot: "oklch(0.55 0.06 220)" },
              {
                label: "In Progress",
                range: "25–60%",
                dot: "oklch(0.65 0.14 45)",
              },
              {
                label: "Operational",
                range: "60–80%",
                dot: "oklch(0.70 0.16 155)",
              },
              {
                label: "Optimised",
                range: "80–100%",
                dot: "oklch(0.78 0.18 193)",
              },
            ].map(({ label, range, dot }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dot }}
                  aria-hidden="true"
                />
                {label}
                <span className="opacity-50">({range})</span>
              </span>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}
