import { SkeletonBrief } from "@/components/ui/SkeletonCard";
import { useDailyBrief } from "@/hooks/useAios";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Newspaper,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "motion/react";

// ── Sub-components ─────────────────────────────────────────────────────────────

function BriefHeader({ title, date }: { title: string; date: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-card"
      style={{ borderColor: "oklch(var(--border) / 0.4)" }}
    >
      {/* Decorative top stripe */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.76 0.14 195) 0%, oklch(0.65 0.18 230) 50%, oklch(0.72 0.16 210) 100%)",
        }}
      />
      <div className="p-6 sm:p-8">
        {/* Masthead */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: "oklch(0.76 0.14 195 / 0.15)" }}
            >
              <Newspaper
                className="h-5 w-5"
                style={{ color: "oklch(0.76 0.14 195)" }}
              />
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.76 0.14 195)" }}
              >
                AIOS Daily Brief
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Compiled by Business Manager
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
            style={{
              borderColor: "oklch(0.76 0.14 195 / 0.25)",
              background: "oklch(0.76 0.14 195 / 0.08)",
              color: "oklch(0.76 0.14 195)",
            }}
          >
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-5 border-t"
          style={{ borderColor: "oklch(var(--border) / 0.3)" }}
        />

        {/* Title */}
        <h1 className="font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {title}
        </h1>

        {/* Byline */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ background: "oklch(0.76 0.14 195 / 0.2)" }}
          >
            <User
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.76 0.14 195)" }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              Business Manager
            </span>
            {" · "}AI Operating System · Delivered at 06:00
          </p>
        </div>
      </div>
    </div>
  );
}

function ExecutiveSummary({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border bg-card p-6 sm:p-8"
      style={{ borderColor: "oklch(var(--border) / 0.4)" }}
      data-ocid="brief.summary.card"
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles
          className="h-4 w-4"
          style={{ color: "oklch(0.76 0.14 195)" }}
        />
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.76 0.14 195)" }}
        >
          Executive Summary
        </h2>
      </div>
      <p className="text-base leading-relaxed text-foreground">{text}</p>
    </motion.div>
  );
}

function PriorityList({ items }: { items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border bg-card p-6 sm:p-8"
      style={{ borderColor: "oklch(var(--border) / 0.4)" }}
      data-ocid="brief.priorities.card"
    >
      <div className="mb-5 flex items-center gap-2">
        <AlertCircle
          className="h-4 w-4"
          style={{ color: "oklch(0.72 0.18 41)" }}
        />
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.72 0.18 41)" }}
        >
          Top Priorities
        </h2>
      </div>
      <ul className="space-y-3" data-ocid="brief.priorities.list">
        {items.map((priority, index) => (
          <li
            key={priority}
            className="flex items-start gap-3"
            data-ocid={`brief.priorities.item.${index + 1}`}
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{
                background: "oklch(0.72 0.18 41 / 0.15)",
                color: "oklch(0.72 0.18 41)",
              }}
            >
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed text-foreground">
              {priority}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ActionList({ items }: { items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border bg-card p-6 sm:p-8"
      style={{ borderColor: "oklch(var(--border) / 0.4)" }}
      data-ocid="brief.actions.card"
    >
      <div className="mb-5 flex items-center gap-2">
        <CheckCircle2
          className="h-4 w-4"
          style={{ color: "oklch(0.76 0.22 141)" }}
        />
        <h2
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.76 0.22 141)" }}
        >
          Recommended Actions
        </h2>
      </div>
      <ul className="space-y-3" data-ocid="brief.actions.list">
        {items.map((action, index) => (
          <li
            key={action}
            className="group flex items-start gap-3 rounded-lg p-2.5 transition-smooth"
            style={{ background: "oklch(var(--muted) / 0.3)" }}
            data-ocid={`brief.actions.item.${index + 1}`}
          >
            <ChevronRight
              className="mt-0.5 h-4 w-4 shrink-0 transition-smooth group-hover:translate-x-0.5"
              style={{ color: "oklch(0.76 0.22 141)" }}
            />
            <span className="text-sm leading-relaxed text-foreground">
              {action}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function BriefFooter() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-6 py-4"
      style={{
        borderColor: "oklch(var(--border) / 0.3)",
        background: "oklch(var(--muted) / 0.2)",
      }}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" />
        <span>Brief auto-refreshes daily at 06:00 AM</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <div
          className="pulse-dot"
          style={{ background: "oklch(0.76 0.22 141)" }}
        />
        <span>Business Manager is Active</span>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DailyBriefPage() {
  const { data: brief, isLoading, isError } = useDailyBrief();

  return (
    <div
      className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6"
      data-ocid="brief.page"
    >
      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-1"
      >
        <h1 className="font-display text-xl font-semibold text-foreground">
          Daily Brief
        </h1>
        <p className="text-sm text-muted-foreground">
          Your morning intelligence report from the AIOS team.
        </p>
      </motion.div>

      {/* Loading state */}
      {isLoading && (
        <div
          className="rounded-xl border bg-card p-8"
          style={{ borderColor: "oklch(var(--border) / 0.4)" }}
          data-ocid="brief.loading_state"
        >
          <SkeletonBrief />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="rounded-xl border p-8 text-center"
          style={{
            borderColor: "oklch(var(--destructive) / 0.3)",
            background: "oklch(var(--destructive) / 0.06)",
          }}
          data-ocid="brief.error_state"
        >
          <AlertCircle
            className="mx-auto mb-3 h-8 w-8"
            style={{ color: "oklch(var(--destructive))" }}
          />
          <p className="text-sm text-muted-foreground">
            Unable to load today's brief. Please try again shortly.
          </p>
        </div>
      )}

      {/* Brief content */}
      {!isLoading && !isError && brief && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BriefHeader title={brief.title} date={brief.date} />
          </motion.div>

          <ExecutiveSummary text={brief.executiveSummary} />

          {/* Visual separator */}
          <div className="relative flex items-center py-2">
            <div
              className="flex-1 border-t"
              style={{ borderColor: "oklch(var(--border) / 0.3)" }}
            />
            <span
              className="mx-4 flex h-6 w-6 items-center justify-center rounded-full text-xs"
              style={{
                background: "oklch(0.76 0.14 195 / 0.12)",
                color: "oklch(0.76 0.14 195)",
              }}
            >
              ✦
            </span>
            <div
              className="flex-1 border-t"
              style={{ borderColor: "oklch(var(--border) / 0.3)" }}
            />
          </div>

          <PriorityList items={brief.topPriorities} />
          <ActionList items={brief.recommendedActions} />
          <BriefFooter />
        </>
      )}
    </div>
  );
}
