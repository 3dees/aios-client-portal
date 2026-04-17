import { c as createLucideIcon, g as useDailyBrief, j as jsxRuntimeExports } from "./index-Di-E6i1E.js";
import { m as motion, c as SkeletonBrief } from "./proxy-6gKB9W6M.js";
import { C as CircleAlert } from "./circle-alert-CjEyMH4P.js";
import { C as Clock } from "./clock-DvWd7tXR.js";
import { U as User } from "./user-L9el_mkz.js";
import { C as ChevronRight } from "./chevron-right-CsXxzYMD.js";
import "./skeleton-COCRBjF9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 18h-5", key: "95g1m2" }],
  ["path", { d: "M18 14h-8", key: "sponae" }],
  [
    "path",
    {
      d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
      key: "39pd36"
    }
  ],
  ["rect", { width: "8", height: "4", x: "10", y: "6", rx: "1", key: "aywv1n" }]
];
const Newspaper = createLucideIcon("newspaper", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function BriefHeader({ title, date }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden rounded-xl border bg-card",
      style: { borderColor: "oklch(var(--border) / 0.4)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-1 w-full",
            style: {
              background: "linear-gradient(90deg, oklch(0.76 0.14 195) 0%, oklch(0.65 0.18 230) 50%, oklch(0.72 0.16 210) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-10 w-10 items-center justify-center rounded-lg",
                  style: { background: "oklch(0.76 0.14 195 / 0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Newspaper,
                    {
                      className: "h-5 w-5",
                      style: { color: "oklch(0.76 0.14 195)" }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold uppercase tracking-widest",
                    style: { color: "oklch(0.76 0.14 195)" },
                    children: "AIOS Daily Brief"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Compiled by Business Manager" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs",
                style: {
                  borderColor: "oklch(0.76 0.14 195 / 0.25)",
                  background: "oklch(0.76 0.14 195 / 0.08)",
                  color: "oklch(0.76 0.14 195)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "my-5 border-t",
              style: { borderColor: "oklch(var(--border) / 0.3)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-6 w-6 items-center justify-center rounded-full",
                style: { background: "oklch(0.76 0.14 195 / 0.2)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  User,
                  {
                    className: "h-3.5 w-3.5",
                    style: { color: "oklch(0.76 0.14 195)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Business Manager" }),
              " · ",
              "AI Operating System · Delivered at 06:00"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ExecutiveSummary({ text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.1 },
      className: "rounded-xl border bg-card p-6 sm:p-8",
      style: { borderColor: "oklch(var(--border) / 0.4)" },
      "data-ocid": "brief.summary.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Sparkles,
            {
              className: "h-4 w-4",
              style: { color: "oklch(0.76 0.14 195)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-xs font-semibold uppercase tracking-widest",
              style: { color: "oklch(0.76 0.14 195)" },
              children: "Executive Summary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-foreground", children: text })
      ]
    }
  );
}
function PriorityList({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.2 },
      className: "rounded-xl border bg-card p-6 sm:p-8",
      style: { borderColor: "oklch(var(--border) / 0.4)" },
      "data-ocid": "brief.priorities.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "h-4 w-4",
              style: { color: "oklch(0.72 0.18 41)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-xs font-semibold uppercase tracking-widest",
              style: { color: "oklch(0.72 0.18 41)" },
              children: "Top Priorities"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "brief.priorities.list", children: items.map((priority, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "flex items-start gap-3",
            "data-ocid": `brief.priorities.item.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  style: {
                    background: "oklch(0.72 0.18 41 / 0.15)",
                    color: "oklch(0.72 0.18 41)"
                  },
                  children: index + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-relaxed text-foreground", children: priority })
            ]
          },
          priority
        )) })
      ]
    }
  );
}
function ActionList({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.3 },
      className: "rounded-xl border bg-card p-6 sm:p-8",
      style: { borderColor: "oklch(var(--border) / 0.4)" },
      "data-ocid": "brief.actions.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              className: "h-4 w-4",
              style: { color: "oklch(0.76 0.22 141)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-xs font-semibold uppercase tracking-widest",
              style: { color: "oklch(0.76 0.22 141)" },
              children: "Recommended Actions"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "brief.actions.list", children: items.map((action, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            className: "group flex items-start gap-3 rounded-lg p-2.5 transition-smooth",
            style: { background: "oklch(var(--muted) / 0.3)" },
            "data-ocid": `brief.actions.item.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronRight,
                {
                  className: "mt-0.5 h-4 w-4 shrink-0 transition-smooth group-hover:translate-x-0.5",
                  style: { color: "oklch(0.76 0.22 141)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-relaxed text-foreground", children: action })
            ]
          },
          action
        )) })
      ]
    }
  );
}
function BriefFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4, delay: 0.45 },
      className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border px-6 py-4",
      style: {
        borderColor: "oklch(var(--border) / 0.3)",
        background: "oklch(var(--muted) / 0.2)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Brief auto-refreshes daily at 06:00 AM" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "pulse-dot",
              style: { background: "oklch(0.76 0.22 141)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Business Manager is Active" })
        ] })
      ]
    }
  );
}
function DailyBriefPage() {
  const { data: brief, isLoading, isError } = useDailyBrief();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6",
      "data-ocid": "brief.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            className: "space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground", children: "Daily Brief" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your morning intelligence report from the AIOS team." })
            ]
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border bg-card p-8",
            style: { borderColor: "oklch(var(--border) / 0.4)" },
            "data-ocid": "brief.loading_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonBrief, {})
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border p-8 text-center",
            style: {
              borderColor: "oklch(var(--destructive) / 0.3)",
              background: "oklch(var(--destructive) / 0.06)"
            },
            "data-ocid": "brief.error_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleAlert,
                {
                  className: "mx-auto mb-3 h-8 w-8",
                  style: { color: "oklch(var(--destructive))" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Unable to load today's brief. Please try again shortly." })
            ]
          }
        ),
        !isLoading && !isError && brief && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BriefHeader, { title: brief.title, date: brief.date })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveSummary, { text: brief.executiveSummary }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 border-t",
                style: { borderColor: "oklch(var(--border) / 0.3)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "mx-4 flex h-6 w-6 items-center justify-center rounded-full text-xs",
                style: {
                  background: "oklch(0.76 0.14 195 / 0.12)",
                  color: "oklch(0.76 0.14 195)"
                },
                children: "✦"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 border-t",
                style: { borderColor: "oklch(var(--border) / 0.3)" }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PriorityList, { items: brief.topPriorities }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionList, { items: brief.recommendedActions }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BriefFooter, {})
        ] })
      ]
    }
  );
}
export {
  DailyBriefPage as default
};
