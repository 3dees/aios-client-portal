import { c as createLucideIcon, d as useMetrics, j as jsxRuntimeExports, C as ChartColumn, t as trendKind } from "./index-Di-E6i1E.js";
import { m as motion, S as SkeletonStatCard } from "./proxy-6gKB9W6M.js";
import { T as TrendingUp, a as TrendingDown, M as Minus } from "./trending-up-D_wVTPF8.js";
import "./skeleton-COCRBjF9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function TrendIcon({ trend }) {
  const kind = trendKind(trend);
  if (kind === "Up")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TrendingUp,
      {
        className: "w-4 h-4",
        style: { color: "oklch(0.76 0.22 141)" }
      }
    );
  if (kind === "Down")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TrendingDown,
      {
        className: "w-4 h-4",
        style: { color: "oklch(0.62 0.22 24)" }
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4 text-muted-foreground" });
}
function trendLabel(trend) {
  const kind = trendKind(trend);
  if (kind === "Up")
    return { text: "Trending up", className: "text-emerald-400" };
  if (kind === "Down")
    return { text: "Trending down", className: "text-red-400" };
  return { text: "Holding steady", className: "text-muted-foreground" };
}
function ProgressBar({ value, target }) {
  const pct = Math.min(100, Math.round(value / target * 100));
  const isNearTarget = pct >= 90;
  const isAtTarget = pct >= 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress to target" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-1.5 rounded-full overflow-hidden",
        style: { backgroundColor: "oklch(0.26 0 0)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full",
            style: {
              background: isAtTarget ? "oklch(0.76 0.22 141)" : isNearTarget ? "oklch(0.76 0.14 195)" : "oklch(0.62 0.14 195)"
            },
            initial: { width: 0 },
            whileInView: { width: `${pct}%` },
            viewport: { once: true },
            transition: { duration: 0.9, ease: "easeOut", delay: 0.2 }
          }
        )
      }
    )
  ] });
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
  ocid
}) {
  const { text: trendText, className: trendClass } = trendLabel(trend);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": ocid,
      className: "relative rounded-xl border bg-card overflow-hidden transition-smooth hover:-translate-y-0.5",
      style: { borderColor: "oklch(0.26 0 0)" },
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.12 },
      whileHover: { borderColor: `oklch(0.76 0.14 ${accentHue})` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-0 right-0 h-0.5",
            style: { background: `oklch(0.76 0.14 ${accentHue})` }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-smooth",
            style: {
              boxShadow: `inset 0 0 60px oklch(0.76 0.14 ${accentHue} / 0.04)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pt-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-4xl font-display font-bold leading-none",
                style: { color: `oklch(0.9 0.1 ${accentHue})` },
                children: value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 pb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { trend }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${trendClass}`, children: trendText })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: rawValue, target: rawTarget }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Target: ",
              targetText
            ] })
          ] })
        ] })
      ]
    }
  );
}
function buildCards(m) {
  return [
    {
      label: "Away-From-Desk Autonomy",
      value: `${m.awayFromDeskHours.toFixed(1)}h`,
      targetText: `${m.awayFromDeskTarget.toFixed(1)}h / day`,
      trend: m.awayFromDeskTrend,
      rawValue: m.awayFromDeskHours,
      rawTarget: m.awayFromDeskTarget,
      description: "Hours per day your business runs fully autonomously while you step away.",
      accentHue: 195,
      index: 0,
      ocid: "results.away_from_desk.card"
    },
    {
      label: "Task Automation %",
      value: `${m.taskAutomationPct}%`,
      targetText: `${m.taskAutomationTarget}%+`,
      trend: m.taskAutomationTrend,
      rawValue: m.taskAutomationPct,
      rawTarget: m.taskAutomationTarget,
      description: "Share of routine tasks executed end-to-end by your AI agent team without human input.",
      accentHue: 141,
      index: 1,
      ocid: "results.task_automation.card"
    },
    {
      label: "Revenue Per Employee",
      value: `$${(m.revenuePerEmployee / 1e3).toFixed(0)}k`,
      targetText: `$${(m.revenuePerEmployeeTarget / 1e3).toFixed(0)}k`,
      trend: m.revenuePerEmployeeTrend,
      rawValue: m.revenuePerEmployee,
      rawTarget: m.revenuePerEmployeeTarget,
      description: "Annualised revenue generated per team member — a key leverage indicator for your AIOS investment.",
      accentHue: 78,
      index: 2,
      ocid: "results.revenue_per_employee.card"
    }
  ];
}
function Results() {
  const { data: metrics, isLoading } = useMetrics();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "results.page", className: "space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "section-header",
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-semibold text-foreground", children: "Results Dashboard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Live metrics tracking your AIOS performance against key business targets." })
        ] })
      }
    ),
    isLoading || !metrics ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "results.loading_state",
        className: "grid grid-cols-1 md:grid-cols-3 gap-5",
        children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonStatCard, {}, i))
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: buildCards(metrics).map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...card }, card.ocid)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        className: "text-xs text-muted-foreground text-center pb-2",
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { delay: 0.6 },
        children: "Metrics refresh every 30 seconds. All figures are derived from your live agent activity and connected data sources."
      }
    )
  ] });
}
export {
  Results as default
};
