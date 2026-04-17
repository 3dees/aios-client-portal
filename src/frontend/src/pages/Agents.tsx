import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { AgentStatusBadge } from "@/components/ui/StatusBadge";
import { useAgents } from "@/hooks/useAios";
import { type Agent, agentStatusKind } from "@/types/aios";
import {
  ActivityIcon,
  BarChart2Icon,
  BriefcaseIcon,
  ClockIcon,
  CpuIcon,
  HeartHandshakeIcon,
  PenLineIcon,
  ShieldCheckIcon,
  Users2Icon,
} from "lucide-react";
import { motion } from "motion/react";

// ── Agent icon map ─────────────────────────────────────────────────────────────

const AGENT_ICONS: Record<string, React.ElementType> = {
  "business-manager": BriefcaseIcon,
  "finance-manager": BarChart2Icon,
  "content-strategist": PenLineIcon,
  "operations-architect": CpuIcon,
  "success-coach": HeartHandshakeIcon,
  "security-officer": ShieldCheckIcon,
};

// ── Relative time helper ───────────────────────────────────────────────────────

function relativeTime(lastActivity: bigint): string {
  const diffMs = Date.now() - Number(lastActivity);
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ── Agent Card ─────────────────────────────────────────────────────────────────

interface AgentCardProps {
  agent: Agent;
  index: number;
}

function AgentCard({ agent, index }: AgentCardProps) {
  const Icon = AGENT_ICONS[agent.id] ?? Users2Icon;
  const status = agentStatusKind(agent.status);
  const isActive = status === "Active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`agents.item.${index + 1}`}
      className="agent-card group relative flex flex-col gap-4"
      style={
        isActive
          ? {
              borderColor: "oklch(0.56 0.14 195 / 0.45)",
              boxShadow: "0 0 0 1px oklch(0.56 0.14 195 / 0.12)",
            }
          : undefined
      }
    >
      {/* Top row: icon + status */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-smooth"
          style={{
            backgroundColor: isActive
              ? "oklch(0.76 0.14 195 / 0.1)"
              : "oklch(var(--muted) / 0.5)",
            borderColor: isActive
              ? "oklch(0.56 0.14 195 / 0.35)"
              : "oklch(var(--border) / 0.4)",
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{
              color: isActive
                ? "oklch(0.76 0.14 195)"
                : "oklch(var(--muted-foreground))",
            }}
          />
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>

      {/* Name + description */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-display font-semibold text-foreground leading-snug">
          {agent.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {agent.roleDescription}
        </p>
      </div>

      {/* Footer: last activity */}
      <div
        className="mt-auto flex items-center gap-1.5 pt-3 border-t"
        style={{ borderColor: "oklch(var(--border) / 0.3)" }}
      >
        <ClockIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground">
          Last active: {relativeTime(agent.lastActivity)}
        </span>
        {isActive && (
          <span
            className="ml-auto flex items-center gap-1 text-xs font-medium"
            style={{ color: "oklch(0.76 0.14 195)" }}
          >
            <ActivityIcon className="h-3 w-3" />
            Live
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────

function AgentsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-ocid="agents.empty_state"
      className="col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-20 text-center"
      style={{ borderColor: "oklch(var(--border) / 0.4)" }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full border"
        style={{
          backgroundColor: "oklch(var(--muted) / 0.4)",
          borderColor: "oklch(var(--border) / 0.3)",
        }}
      >
        <Users2Icon className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-display font-semibold text-foreground">
          No agents found
        </p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Your AI agent team will appear here once the system initialises.
        </p>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function AgentsPage() {
  const { data: agents, isLoading } = useAgents();

  const activeCount =
    agents?.filter((a) => agentStatusKind(a.status) === "Active").length ?? 0;
  const totalCount = agents?.length ?? 0;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        data-ocid="agents.page"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              AI Agent Team
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Six specialised agents — monitoring, planning, and executing
              around the clock.
            </p>
          </div>

          {/* Live summary pill */}
          {!isLoading && (
            <div
              className="flex items-center gap-2 rounded-lg border px-4 py-2"
              style={{
                backgroundColor: "oklch(0.76 0.14 195 / 0.06)",
                borderColor: "oklch(0.56 0.14 195 / 0.3)",
              }}
            >
              <span
                className="pulse-dot"
                style={{ backgroundColor: "oklch(0.76 0.22 141)" }}
              />
              <span
                className="text-sm font-medium font-mono"
                style={{ color: "oklch(0.76 0.14 195)" }}
              >
                {activeCount} / {totalCount} Active
              </span>
            </div>
          )}
        </div>

        <div
          className="mt-5 h-px"
          style={{ backgroundColor: "oklch(var(--border) / 0.3)" }}
        />
      </motion.div>

      {/* Agent grid */}
      <div
        data-ocid="agents.list"
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading ? (
          Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((k) => (
            <SkeletonCard key={k} />
          ))
        ) : !agents || agents.length === 0 ? (
          <AgentsEmptyState />
        ) : (
          agents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))
        )}
      </div>

      {/* Status legend */}
      {!isLoading && agents && agents.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap items-center gap-6 pt-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
            Status key
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="badge-active">
              <span
                className="pulse-dot"
                style={{ backgroundColor: "oklch(0.76 0.22 141)" }}
              />
              Active
            </span>
            <span className="badge-idle">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "oklch(0.84 0.14 78)" }}
              />
              Idle
            </span>
            <span className="badge-offline">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "oklch(0.62 0.22 24)" }}
              />
              Offline
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
