import { SkeletonCard, SkeletonStatCard } from "@/components/ui/SkeletonCard";
import {
  AgentStatusBadge,
  SystemStatusBadge,
} from "@/components/ui/StatusBadge";
import {
  useAgents,
  useClientInfo,
  useLayers,
  useMetrics,
} from "@/hooks/useAios";
import { agentStatusKind, systemStatusKind, trendKind } from "@/types/aios";
import type { Agent, Layer, Metric } from "@/types/aios";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bot,
  ChevronRight,
  Clock,
  Cpu,
  Database,
  Layers,
  Minus,
  Shield,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ts: bigint): string {
  const diffMs = Date.now() - Number(ts);
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function TrendIcon({ direction }: { direction: string }) {
  if (direction === "Up")
    return <TrendingUp className="w-4 h-4 text-emerald-400" />;
  if (direction === "Down")
    return <TrendingDown className="w-4 h-4 text-rose-400" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function WelcomeHeader({
  clientName,
  systemStatusStr,
}: {
  clientName: string;
  systemStatusStr: "Active" | "Inactive" | "Pending";
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const systemStatus = { __kind__: systemStatusStr } as {
    __kind__: "Active" | "Inactive" | "Pending";
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-mono text-primary tracking-widest uppercase">
        AIOS Dashboard
      </p>
      <h1 className="text-3xl font-display font-semibold text-foreground leading-tight">
        {greeting},{" "}
        <span style={{ color: "oklch(var(--primary))" }}>{clientName}</span>
      </h1>
      <div className="flex items-center gap-3 mt-1">
        <SystemStatusBadge status={systemStatus} />
        <span className="text-xs text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  index: number;
}) {
  return (
    <motion.div
      className="stat-card flex flex-col gap-3"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      data-ocid={`summary.card.${index + 1}`}
    >
      <div className="flex items-start justify-between">
        <div
          className="p-2 rounded-md border"
          style={{
            background: "oklch(var(--primary) / 0.1)",
            borderColor: "oklch(var(--primary) / 0.2)",
          }}
        >
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-display font-semibold text-foreground">
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
      <p
        className="text-xs font-medium uppercase tracking-wider"
        style={{ color: "oklch(var(--muted-foreground))" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

function AgentRow({ agent, index }: { agent: Agent; index: number }) {
  const kind = agentStatusKind(agent.status);
  const barColor =
    kind === "Active"
      ? "bg-emerald-500"
      : kind === "Idle"
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <motion.div
      className="flex items-center gap-4 py-3 border-b last:border-0"
      style={{ borderColor: "oklch(var(--border) / 0.25)" }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
      data-ocid={`agents.item.${index + 1}`}
    >
      <div className={`w-1.5 h-8 rounded-full flex-shrink-0 ${barColor}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {agent.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {agent.roleDescription.length > 60
            ? `${agent.roleDescription.slice(0, 60)}…`
            : agent.roleDescription}
        </p>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <AgentStatusBadge status={agent.status} />
        <span className="text-xs text-muted-foreground font-mono hidden sm:block">
          {timeAgo(agent.lastActivity)}
        </span>
      </div>
    </motion.div>
  );
}

const LAYER_ICONS: Record<string, React.ReactNode> = {
  Context: <Cpu className="w-3.5 h-3.5" />,
  Data: <Database className="w-3.5 h-3.5" />,
  Intelligence: <Bot className="w-3.5 h-3.5" />,
  Automate: <Zap className="w-3.5 h-3.5" />,
  Build: <Layers className="w-3.5 h-3.5" />,
};

function LayerProgress({ layer, index }: { layer: Layer; index: number }) {
  const pct = Number(layer.completionPct);
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.07 }}
      data-ocid={`layers.item.${index + 1}`}
    >
      <div className="flex items-center gap-2 w-32 flex-shrink-0">
        <span className="text-primary/70">
          {LAYER_ICONS[layer.name] ?? null}
        </span>
        <span className="text-xs font-medium text-foreground">
          {layer.name}
        </span>
      </div>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "oklch(0.76 0.14 195)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{
            duration: 0.8,
            delay: 0.2 + index * 0.1,
            ease: "easeOut",
          }}
        />
      </div>
      <span className="text-xs font-mono text-primary w-8 text-right">
        {pct}%
      </span>
      <span className="text-xs text-muted-foreground w-20 text-right hidden sm:block">
        {layer.statusLabel}
      </span>
    </motion.div>
  );
}

function MetricCards({ metric }: { metric: Metric }) {
  const cards = [
    {
      label: "Away-From-Desk Autonomy",
      value: `${metric.awayFromDeskHours}h`,
      unit: "/ day",
      target: `Target: ${metric.awayFromDeskTarget}h`,
      trend: trendKind(metric.awayFromDeskTrend),
      icon: <Clock className="w-4 h-4 text-primary" />,
    },
    {
      label: "Task Automation",
      value: `${metric.taskAutomationPct}%`,
      unit: "",
      target: `Target: ${metric.taskAutomationTarget}%`,
      trend: trendKind(metric.taskAutomationTrend),
      icon: <Activity className="w-4 h-4 text-primary" />,
    },
    {
      label: "Revenue / Employee",
      value: `$${(metric.revenuePerEmployee / 1000).toFixed(0)}k`,
      unit: "",
      target: `Target: $${(metric.revenuePerEmployeeTarget / 1000).toFixed(0)}k`,
      trend: trendKind(metric.revenuePerEmployeeTrend),
      icon: <TrendingUp className="w-4 h-4 text-primary" />,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      data-ocid="metrics.section"
    >
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          className="stat-card flex flex-col gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          data-ocid={`metrics.item.${i + 1}`}
        >
          <div className="flex items-center justify-between">
            {c.icon}
            <TrendIcon direction={c.trend} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-display font-bold text-foreground">
              {c.value}
            </span>
            {c.unit && (
              <span className="text-xs text-muted-foreground">{c.unit}</span>
            )}
          </div>
          <p className="text-xs font-medium text-foreground/80">{c.label}</p>
          <p className="text-xs text-muted-foreground">{c.target}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: client, isLoading: clientLoading } = useClientInfo();
  const { data: agents, isLoading: agentsLoading } = useAgents();
  const { data: layers, isLoading: layersLoading } = useLayers();
  const { data: metrics, isLoading: metricsLoading } = useMetrics();

  const activeCount =
    agents?.filter((a) => agentStatusKind(a.status) === "Active").length ?? 0;
  const avgCompletion = layers
    ? Math.round(
        layers.reduce((sum, l) => sum + Number(l.completionPct), 0) /
          layers.length,
      )
    : 0;
  const healthStr = client ? systemStatusKind(client.systemStatus) : "Pending";

  return (
    <div className="space-y-8 pb-8" data-ocid="dashboard.page">
      {/* Welcome header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {clientLoading ? (
          <div className="space-y-2">
            <div className="h-3 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-64 bg-muted rounded animate-pulse" />
            <div className="h-5 w-40 bg-muted rounded animate-pulse" />
          </div>
        ) : client ? (
          <WelcomeHeader
            clientName={client.clientName}
            systemStatusStr={systemStatusKind(client.systemStatus)}
          />
        ) : null}

        <Link
          to="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-smooth self-start sm:self-auto hover:bg-primary/10"
          style={{
            color: "oklch(var(--primary))",
            borderColor: "oklch(var(--primary) / 0.3)",
          }}
          data-ocid="dashboard.admin_link"
        >
          <Shield className="w-4 h-4" />
          Manage Portal
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      {/* Quick summary cards */}
      <section data-ocid="dashboard.summary.section">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {agentsLoading || clientLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonStatCard key={`skel-sum-${i.toString()}`} />
            ))
          ) : (
            <>
              <SummaryCard
                index={0}
                icon={<Bot className="w-4 h-4 text-primary" />}
                label="Active Agents"
                value={`${activeCount} / ${agents?.length ?? 0}`}
                sub="agents currently running"
              />
              <SummaryCard
                index={1}
                icon={<Layers className="w-4 h-4 text-primary" />}
                label="Layer Progress"
                value={`${avgCompletion}%`}
                sub="average completion across 5 layers"
              />
              <SummaryCard
                index={2}
                icon={<Activity className="w-4 h-4 text-primary" />}
                label="System Health"
                value={healthStr}
                sub="overall AIOS status"
              />
            </>
          )}
        </div>
      </section>

      {/* Two-column: agents + layers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent activity */}
        <section
          className="rounded-lg border bg-card p-5"
          style={{ borderColor: "oklch(var(--border) / 0.4)" }}
          data-ocid="dashboard.agents.section"
        >
          <div className="section-header">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                Agent Team
              </h2>
            </div>
            <Link
              to="/agents"
              className="flex items-center gap-1 text-xs hover:underline transition-smooth"
              style={{ color: "oklch(var(--primary))" }}
              data-ocid="dashboard.agents.view_all_link"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {agentsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={`skel-agent-${i.toString()}`} />
              ))}
            </div>
          ) : (
            <div>
              {(agents ?? []).map((agent, i) => (
                <AgentRow key={agent.id} agent={agent} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Five Layers */}
        <section
          className="rounded-lg border bg-card p-5"
          style={{ borderColor: "oklch(var(--border) / 0.4)" }}
          data-ocid="dashboard.layers.section"
        >
          <div className="section-header">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">
                Five Layers
              </h2>
            </div>
            <Link
              to="/layers"
              className="flex items-center gap-1 text-xs hover:underline transition-smooth"
              style={{ color: "oklch(var(--primary))" }}
              data-ocid="dashboard.layers.view_all_link"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {layersLoading ? (
            <div className="space-y-4 pt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`skel-layer-${i.toString()}`}
                  className="h-4 bg-muted rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4 pt-1">
              {(layers ?? []).map((layer, i) => (
                <LayerProgress key={layer.id} layer={layer} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Key metrics */}
      <section data-ocid="dashboard.metrics.section">
        <div className="section-header">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Key Results
            </h2>
          </div>
          <Link
            to="/results"
            className="flex items-center gap-1 text-xs hover:underline transition-smooth"
            style={{ color: "oklch(var(--primary))" }}
            data-ocid="dashboard.metrics.view_all_link"
          >
            Full results <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {metricsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonStatCard key={`skel-metric-${i.toString()}`} />
            ))}
          </div>
        ) : metrics ? (
          <MetricCards metric={metrics} />
        ) : null}
      </section>

      {/* Daily brief teaser */}
      <motion.section
        className="rounded-lg border bg-card p-5 glow-accent"
        style={{ borderColor: "oklch(var(--primary) / 0.2)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        data-ocid="dashboard.brief.section"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="pulse-dot bg-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Morning Brief
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              — Business Manager
            </span>
          </div>
          <Link
            to="/brief"
            className="flex items-center gap-1 text-xs hover:underline transition-smooth flex-shrink-0"
            style={{ color: "oklch(var(--primary))" }}
            data-ocid="dashboard.brief.read_more_link"
          >
            Read full brief <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          Your six agents worked through the night. Revenue pipeline is trending
          +12% month-over-month, three automation workflows completed
          deployment, and the content calendar for next week has been fully
          drafted and queued.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Q3 cash-flow review",
            "Content batch approval",
            "At-risk accounts",
          ].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs border"
              style={{
                background: "oklch(var(--primary) / 0.08)",
                borderColor: "oklch(var(--primary) / 0.2)",
                color: "oklch(var(--primary))",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
