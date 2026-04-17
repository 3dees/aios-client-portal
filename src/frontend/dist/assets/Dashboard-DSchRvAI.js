import { c as createLucideIcon, u as useClientInfo, a as useAgents, b as useLayers, d as useMetrics, e as agentStatusKind, s as systemStatusKind, j as jsxRuntimeExports, L as Link, B as Bot, f as Layers, S as SystemStatusBadge, A as AgentStatusBadge, t as trendKind, Z as Zap } from "./index-Di-E6i1E.js";
import { m as motion, S as SkeletonStatCard, a as SkeletonCard } from "./proxy-6gKB9W6M.js";
import { C as ChevronRight } from "./chevron-right-CsXxzYMD.js";
import { A as Activity, C as Cpu } from "./cpu-DKojtvtr.js";
import { T as TrendingUp, a as TrendingDown, M as Minus } from "./trending-up-D_wVTPF8.js";
import { C as Clock } from "./clock-DvWd7tXR.js";
import "./skeleton-COCRBjF9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function timeAgo(ts) {
  const diffMs = Date.now() - Number(ts);
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
function TrendIcon({ direction }) {
  if (direction === "Up")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-emerald-400" });
  if (direction === "Down")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "w-4 h-4 text-rose-400" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4 text-muted-foreground" });
}
function WelcomeHeader({
  clientName,
  systemStatusStr
}) {
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const systemStatus = { __kind__: systemStatusStr };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-primary tracking-widest uppercase", children: "AIOS Dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-display font-semibold text-foreground leading-tight", children: [
      greeting,
      ",",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--primary))" }, children: clientName })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SystemStatusBadge, { status: systemStatus }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      }) })
    ] })
  ] });
}
function SummaryCard({
  icon,
  label,
  value,
  sub,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "stat-card flex flex-col gap-3",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.08 },
      "data-ocid": `summary.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "p-2 rounded-md border",
            style: {
              background: "oklch(var(--primary) / 0.1)",
              borderColor: "oklch(var(--primary) / 0.2)"
            },
            children: icon
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-semibold text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs font-medium uppercase tracking-wider",
            style: { color: "oklch(var(--muted-foreground))" },
            children: label
          }
        )
      ]
    }
  );
}
function AgentRow({ agent, index }) {
  const kind = agentStatusKind(agent.status);
  const barColor = kind === "Active" ? "bg-emerald-500" : kind === "Idle" ? "bg-amber-500" : "bg-rose-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-center gap-4 py-3 border-b last:border-0",
      style: { borderColor: "oklch(var(--border) / 0.25)" },
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3, delay: 0.1 + index * 0.06 },
      "data-ocid": `agents.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-8 rounded-full flex-shrink-0 ${barColor}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: agent.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: agent.roleDescription.length > 60 ? `${agent.roleDescription.slice(0, 60)}…` : agent.roleDescription })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AgentStatusBadge, { status: agent.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono hidden sm:block", children: timeAgo(agent.lastActivity) })
        ] })
      ]
    }
  );
}
const LAYER_ICONS = {
  Context: /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-3.5 h-3.5" }),
  Data: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5" }),
  Intelligence: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3.5 h-3.5" }),
  Automate: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
  Build: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" })
};
function LayerProgress({ layer, index }) {
  const pct = Number(layer.completionPct);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-center gap-3",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.35, delay: 0.15 + index * 0.07 },
      "data-ocid": `layers.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-32 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70", children: LAYER_ICONS[layer.name] ?? null }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: layer.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full",
            style: { background: "oklch(0.76 0.14 195)" },
            initial: { width: 0 },
            animate: { width: `${pct}%` },
            transition: {
              duration: 0.8,
              delay: 0.2 + index * 0.1,
              ease: "easeOut"
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-primary w-8 text-right", children: [
          pct,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-20 text-right hidden sm:block", children: layer.statusLabel })
      ]
    }
  );
}
function MetricCards({ metric }) {
  const cards = [
    {
      label: "Away-From-Desk Autonomy",
      value: `${metric.awayFromDeskHours}h`,
      unit: "/ day",
      target: `Target: ${metric.awayFromDeskTarget}h`,
      trend: trendKind(metric.awayFromDeskTrend),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" })
    },
    {
      label: "Task Automation",
      value: `${metric.taskAutomationPct}%`,
      unit: "",
      target: `Target: ${metric.taskAutomationTarget}%`,
      trend: trendKind(metric.taskAutomationTrend),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" })
    },
    {
      label: "Revenue / Employee",
      value: `$${(metric.revenuePerEmployee / 1e3).toFixed(0)}k`,
      unit: "",
      target: `Target: $${(metric.revenuePerEmployeeTarget / 1e3).toFixed(0)}k`,
      trend: trendKind(metric.revenuePerEmployeeTrend),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
      "data-ocid": "metrics.section",
      children: cards.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "stat-card flex flex-col gap-2",
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: i * 0.1 },
          "data-ocid": `metrics.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              c.icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { direction: c.trend })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-foreground", children: c.value }),
              c.unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: c.unit })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground/80", children: c.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: c.target })
          ]
        },
        c.label
      ))
    }
  );
}
function Dashboard() {
  const { data: client, isLoading: clientLoading } = useClientInfo();
  const { data: agents, isLoading: agentsLoading } = useAgents();
  const { data: layers, isLoading: layersLoading } = useLayers();
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const activeCount = (agents == null ? void 0 : agents.filter((a) => agentStatusKind(a.status) === "Active").length) ?? 0;
  const avgCompletion = layers ? Math.round(
    layers.reduce((sum, l) => sum + Number(l.completionPct), 0) / layers.length
  ) : 0;
  const healthStr = client ? systemStatusKind(client.systemStatus) : "Pending";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 pb-8", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-2",
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          clientLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 bg-muted rounded animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-64 bg-muted rounded animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-40 bg-muted rounded animate-pulse" })
          ] }) : client ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            WelcomeHeader,
            {
              clientName: client.clientName,
              systemStatusStr: systemStatusKind(client.systemStatus)
            }
          ) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/admin",
              className: "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-smooth self-start sm:self-auto hover:bg-primary/10",
              style: {
                color: "oklch(var(--primary))",
                borderColor: "oklch(var(--primary) / 0.3)"
              },
              "data-ocid": "dashboard.admin_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                "Manage Portal",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "dashboard.summary.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: agentsLoading || clientLoading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonStatCard, {}, `skel-sum-${i.toString()}`)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          index: 0,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }),
          label: "Active Agents",
          value: `${activeCount} / ${(agents == null ? void 0 : agents.length) ?? 0}`,
          sub: "agents currently running"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          index: 1,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-primary" }),
          label: "Layer Progress",
          value: `${avgCompletion}%`,
          sub: "average completion across 5 layers"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SummaryCard,
        {
          index: 2,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
          label: "System Health",
          value: healthStr,
          sub: "overall AIOS status"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "rounded-lg border bg-card p-5",
          style: { borderColor: "oklch(var(--border) / 0.4)" },
          "data-ocid": "dashboard.agents.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Agent Team" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/agents",
                  className: "flex items-center gap-1 text-xs hover:underline transition-smooth",
                  style: { color: "oklch(var(--primary))" },
                  "data-ocid": "dashboard.agents.view_all_link",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                  ]
                }
              )
            ] }),
            agentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, `skel-agent-${i.toString()}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: (agents ?? []).map((agent, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AgentRow, { agent, index: i }, agent.id)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          className: "rounded-lg border bg-card p-5",
          style: { borderColor: "oklch(var(--border) / 0.4)" },
          "data-ocid": "dashboard.layers.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Five Layers" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/layers",
                  className: "flex items-center gap-1 text-xs hover:underline transition-smooth",
                  style: { color: "oklch(var(--primary))" },
                  "data-ocid": "dashboard.layers.view_all_link",
                  children: [
                    "View all ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                  ]
                }
              )
            ] }),
            layersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pt-2", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-4 bg-muted rounded animate-pulse"
              },
              `skel-layer-${i.toString()}`
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pt-1", children: (layers ?? []).map((layer, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LayerProgress, { layer, index: i }, layer.id)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "dashboard.metrics.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Key Results" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/results",
            className: "flex items-center gap-1 text-xs hover:underline transition-smooth",
            style: { color: "oklch(var(--primary))" },
            "data-ocid": "dashboard.metrics.view_all_link",
            children: [
              "Full results ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      metricsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonStatCard, {}, `skel-metric-${i.toString()}`)) }) : metrics ? /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCards, { metric: metrics }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.section,
      {
        className: "rounded-lg border bg-card p-5 glow-accent",
        style: { borderColor: "oklch(var(--primary) / 0.2)" },
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, delay: 0.3 },
        "data-ocid": "dashboard.brief.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pulse-dot bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Morning Brief" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "— Business Manager" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/brief",
                className: "flex items-center gap-1 text-xs hover:underline transition-smooth flex-shrink-0",
                style: { color: "oklch(var(--primary))" },
                "data-ocid": "dashboard.brief.read_more_link",
                children: [
                  "Read full brief ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3", children: "Your six agents worked through the night. Revenue pipeline is trending +12% month-over-month, three automation workflows completed deployment, and the content calendar for next week has been fully drafted and queued." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            "Q3 cash-flow review",
            "Content batch approval",
            "At-risk accounts"
          ].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded-full text-xs border",
              style: {
                background: "oklch(var(--primary) / 0.08)",
                borderColor: "oklch(var(--primary) / 0.2)",
                color: "oklch(var(--primary))"
              },
              children: tag
            },
            tag
          )) })
        ]
      }
    )
  ] });
}
export {
  Dashboard as default
};
