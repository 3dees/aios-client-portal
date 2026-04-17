import { SkeletonStatCard } from "@/components/ui/SkeletonCard";
import { useMetrics } from "@/hooks/useAios";
import { trendKind } from "@/types/aios";
import type { Metric, TrendDirection } from "@/types/aios";
import {
  BarChart3,
  Minus,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

// ── Trend helpers ─────────────────────────────────────────────────────────────

function TrendIcon({ trend }: { trend: TrendDirection }) {
  const kind = trendKind(trend);
  if (kind === "Up")
    return (
      <TrendingUp
        className="w-4 h-4"
        style={{ color: "oklch(0.76 0.22 141)" }}
      />
    );
  if (kind === "Down")
    return (
      <TrendingDown
        className="w-4 h-4"
        style={{ color: "oklch(0.62 0.22 24)" }}
      />
    );
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

function trendLabel(trend: TrendDirection): {
  text: string;
  className: string;
} {
  const kind = trendKind(trend);
  if (kind === "Up")
    return { text: "Trending up", className: "text-emerald-400" };
  if (kind === "Down")
    return { text: "Trending down", className: "text-red-400" };
  return { text: "Holding steady", className: "text-muted-foreground" };
}

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({ value, target }: { value: number; target: number }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const isNearTarget = pct >= 90;
  const isAtTarget = pct >= 100;

  return (
    <div className="mt-4 space-y-1.5">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Progress to target</span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "oklch(0.26 0 0)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isAtTarget
              ? "oklch(0.76 0.22 141)"
              : isNearTarget
                ? "oklch(0.76 0.14 195)"
                : "oklch(0.62 0.14 195)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  targetText: string;
  trend: TrendDirection;
  rawValue: number;
  rawTarget: number;
  description: string;
  accentHue: number;
  index: number;
  ocid: string;
}

function StatCard({
  label,
  value,
  targetText,
  trend,
  rawValue,
  rawTarget,
  description,
  accentHue,
  index,
  ocid,
}: StatCardProps) {
  const { text: trendText, className: trendClass } = trendLabel(trend);

  return (
    <motion.div
      data-ocid={ocid}
      className="relative rounded-xl border bg-card overflow-hidden transition-smooth hover:-translate-y-0.5"
      style={{ borderColor: "oklch(0.26 0 0)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ borderColor: `oklch(0.76 0.14 ${accentHue})` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `oklch(0.76 0.14 ${accentHue})` }}
      />

      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-smooth"
        style={{
          boxShadow: `inset 0 0 60px oklch(0.76 0.14 ${accentHue} / 0.04)`,
        }}
      />

      <div className="p-6 pt-7">
        {/* Label */}
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
          {label}
        </p>

        {/* Value + trend row */}
        <div className="flex items-end justify-between gap-2 mb-1">
          <span
            className="text-4xl font-display font-bold leading-none"
            style={{ color: `oklch(0.9 0.1 ${accentHue})` }}
          >
            {value}
          </span>
          <div className="flex items-center gap-1.5 pb-1">
            <TrendIcon trend={trend} />
            <span className={`text-xs font-medium ${trendClass}`}>
              {trendText}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {description}
        </p>

        {/* Progress bar */}
        <ProgressBar value={rawValue} target={rawTarget} />

        {/* Target chip */}
        <div className="flex items-center gap-1.5 mt-4">
          <Target className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Target: {targetText}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Metric builder ────────────────────────────────────────────────────────────

function buildCards(m: Metric): StatCardProps[] {
  return [
    {
      label: "Away-From-Desk Autonomy",
      value: `${m.awayFromDeskHours.toFixed(1)}h`,
      targetText: `${m.awayFromDeskTarget.toFixed(1)}h / day`,
      trend: m.awayFromDeskTrend,
      rawValue: m.awayFromDeskHours,
      rawTarget: m.awayFromDeskTarget,
      description:
        "Hours per day your business runs fully autonomously while you step away.",
      accentHue: 195,
      index: 0,
      ocid: "results.away_from_desk.card",
    },
    {
      label: "Task Automation %",
      value: `${m.taskAutomationPct}%`,
      targetText: `${m.taskAutomationTarget}%+`,
      trend: m.taskAutomationTrend,
      rawValue: m.taskAutomationPct,
      rawTarget: m.taskAutomationTarget,
      description:
        "Share of routine tasks executed end-to-end by your AI agent team without human input.",
      accentHue: 141,
      index: 1,
      ocid: "results.task_automation.card",
    },
    {
      label: "Revenue Per Employee",
      value: `$${(m.revenuePerEmployee / 1000).toFixed(0)}k`,
      targetText: `$${(m.revenuePerEmployeeTarget / 1000).toFixed(0)}k`,
      trend: m.revenuePerEmployeeTrend,
      rawValue: m.revenuePerEmployee,
      rawTarget: m.revenuePerEmployeeTarget,
      description:
        "Annualised revenue generated per team member — a key leverage indicator for your AIOS investment.",
      accentHue: 78,
      index: 2,
      ocid: "results.revenue_per_employee.card",
    },
  ];
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Results() {
  const { data: metrics, isLoading } = useMetrics();

  return (
    <div data-ocid="results.page" className="space-y-10">
      {/* Section header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-display font-semibold text-foreground">
              Results Dashboard
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Live metrics tracking your AIOS performance against key business
            targets.
          </p>
        </div>
      </motion.div>

      {/* Metric cards */}
      {isLoading || !metrics ? (
        <div
          data-ocid="results.loading_state"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[0, 1, 2].map((i) => (
            <SkeletonStatCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {buildCards(metrics).map((card) => (
            <StatCard key={card.ocid} {...card} />
          ))}
        </div>
      )}

      {/* Footer note */}
      <motion.p
        className="text-xs text-muted-foreground text-center pb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        Metrics refresh every 30 seconds. All figures are derived from your live
        agent activity and connected data sources.
      </motion.p>
    </div>
  );
}
