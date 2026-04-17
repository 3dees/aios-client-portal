import { c as createLucideIcon, a as useAgents, e as agentStatusKind, j as jsxRuntimeExports, A as AgentStatusBadge } from "./index-Di-E6i1E.js";
import { m as motion, a as SkeletonCard } from "./proxy-6gKB9W6M.js";
import { C as Cpu, A as Activity } from "./cpu-DKojtvtr.js";
import { C as Clock } from "./clock-DvWd7tXR.js";
import "./skeleton-COCRBjF9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  [
    "path",
    {
      d: "M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66",
      key: "4oyue0"
    }
  ],
  ["path", { d: "m18 15-2-2", key: "60u0ii" }],
  ["path", { d: "m15 18-2-2", key: "6p76be" }]
];
const HeartHandshake = createLucideIcon("heart-handshake", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 21a8 8 0 0 0-16 0", key: "3ypg7q" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", key: "10s06x" }]
];
const UsersRound = createLucideIcon("users-round", __iconNode);
const AGENT_ICONS = {
  "business-manager": Briefcase,
  "finance-manager": ChartNoAxesColumn,
  "content-strategist": PenLine,
  "operations-architect": Cpu,
  "success-coach": HeartHandshake,
  "security-officer": ShieldCheck
};
function relativeTime(lastActivity) {
  const diffMs = Date.now() - Number(lastActivity);
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
function AgentCard({ agent, index }) {
  const Icon = AGENT_ICONS[agent.id] ?? UsersRound;
  const status = agentStatusKind(agent.status);
  const isActive = status === "Active";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.35,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1]
      },
      "data-ocid": `agents.item.${index + 1}`,
      className: "agent-card group relative flex flex-col gap-4",
      style: isActive ? {
        borderColor: "oklch(0.56 0.14 195 / 0.45)",
        boxShadow: "0 0 0 1px oklch(0.56 0.14 195 / 0.12)"
      } : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-smooth",
              style: {
                backgroundColor: isActive ? "oklch(0.76 0.14 195 / 0.1)" : "oklch(var(--muted) / 0.5)",
                borderColor: isActive ? "oklch(0.56 0.14 195 / 0.35)" : "oklch(var(--border) / 0.4)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: "h-5 w-5",
                  style: {
                    color: isActive ? "oklch(0.76 0.14 195)" : "oklch(var(--muted-foreground))"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AgentStatusBadge, { status: agent.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-snug", children: agent.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3", children: agent.roleDescription })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-auto flex items-center gap-1.5 pt-3 border-t",
            style: { borderColor: "oklch(var(--border) / 0.3)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Last active: ",
                relativeTime(agent.lastActivity)
              ] }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "ml-auto flex items-center gap-1 text-xs font-medium",
                  style: { color: "oklch(0.76 0.14 195)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }),
                    "Live"
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function AgentsEmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      "data-ocid": "agents.empty_state",
      className: "col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed py-20 text-center",
      style: { borderColor: "oklch(var(--border) / 0.4)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-14 w-14 items-center justify-center rounded-full border",
            style: {
              backgroundColor: "oklch(var(--muted) / 0.4)",
              borderColor: "oklch(var(--border) / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersRound, { className: "h-7 w-7 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "No agents found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Your AI agent team will appear here once the system initialises." })
        ] })
      ]
    }
  );
}
function AgentsPage() {
  const { data: agents, isLoading } = useAgents();
  const activeCount = (agents == null ? void 0 : agents.filter((a) => agentStatusKind(a.status) === "Active").length) ?? 0;
  const totalCount = (agents == null ? void 0 : agents.length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        "data-ocid": "agents.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "AI Agent Team" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Six specialised agents — monitoring, planning, and executing around the clock." })
            ] }),
            !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 rounded-lg border px-4 py-2",
                style: {
                  backgroundColor: "oklch(0.76 0.14 195 / 0.06)",
                  borderColor: "oklch(0.56 0.14 195 / 0.3)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "pulse-dot",
                      style: { backgroundColor: "oklch(0.76 0.22 141)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-sm font-medium font-mono",
                      style: { color: "oklch(0.76 0.14 195)" },
                      children: [
                        activeCount,
                        " / ",
                        totalCount,
                        " Active"
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mt-5 h-px",
              style: { backgroundColor: "oklch(var(--border) / 0.3)" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "agents.list",
        className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        children: isLoading ? Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, k)) : !agents || agents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(AgentsEmptyState, {}) : agents.map((agent, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(AgentCard, { agent, index }, agent.id))
      }
    ),
    !isLoading && agents && agents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.55 },
        className: "flex flex-wrap items-center gap-6 pt-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-widest font-mono", children: "Status key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-active", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "pulse-dot",
                  style: { backgroundColor: "oklch(0.76 0.22 141)" }
                }
              ),
              "Active"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-idle", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full",
                  style: { backgroundColor: "oklch(0.84 0.14 78)" }
                }
              ),
              "Idle"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-offline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full",
                  style: { backgroundColor: "oklch(0.62 0.22 24)" }
                }
              ),
              "Offline"
            ] })
          ] })
        ]
      }
    )
  ] });
}
export {
  AgentsPage as default
};
