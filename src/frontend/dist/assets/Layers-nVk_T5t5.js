import { b as useLayers, j as jsxRuntimeExports } from "./index-Di-E6i1E.js";
import { b as SkeletonLayerRow, m as motion } from "./proxy-6gKB9W6M.js";
import { C as CircleAlert } from "./circle-alert-CjEyMH4P.js";
import { C as ChevronDown } from "./chevron-down-DBG5afDs.js";
import "./skeleton-COCRBjF9.js";
const LAYER_CONFIG = {
  context: {
    hue: 193,
    chroma: 0.18,
    description: "Your business identity, goals, and operating environment — the foundation every other layer depends on.",
    icon: "◈"
  },
  data: {
    hue: 255,
    chroma: 0.16,
    description: "Structured and unstructured data flows, integrations, and knowledge stores that power decision-making.",
    icon: "◉"
  },
  intelligence: {
    hue: 290,
    chroma: 0.18,
    description: "Model training, reasoning pipelines, and adaptive learning calibrated to your specific business context.",
    icon: "◎"
  },
  automate: {
    hue: 45,
    chroma: 0.2,
    description: "Workflow automation, agent orchestration, and trigger-based execution that eliminates manual toil.",
    icon: "◑"
  },
  build: {
    hue: 155,
    chroma: 0.18,
    description: "Custom tooling, integrations, and bespoke capabilities constructed on top of your live AIOS stack.",
    icon: "◐"
  }
};
const LAYER_ORDER = ["context", "data", "intelligence", "automate", "build"];
function sortLayers(layers) {
  return [...layers].sort((a, b) => {
    const ai = LAYER_ORDER.indexOf(a.id.toLowerCase());
    const bi = LAYER_ORDER.indexOf(b.id.toLowerCase());
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}
function ProgressBar({ pct, hue, chroma, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "relative h-2.5 rounded-full overflow-hidden",
      style: { backgroundColor: `oklch(0.22 0.03 ${hue})` },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "h-full rounded-full",
          style: {
            background: `linear-gradient(to right, oklch(0.62 ${chroma} ${hue}), oklch(0.80 ${chroma * 0.7} ${hue}))`,
            boxShadow: `0 0 12px oklch(0.70 ${chroma} ${hue} / 0.45)`
          },
          initial: { width: 0 },
          animate: { width: `${pct}%` },
          transition: {
            duration: 1,
            delay: index * 0.12,
            ease: [0.4, 0, 0.2, 1]
          }
        }
      )
    }
  );
}
function DependencyConnector({
  fromHue,
  toHue
}) {
  const midHue = Math.round((fromHue + toHue) / 2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex justify-center py-1", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute w-px h-full top-0",
        style: {
          background: `linear-gradient(to bottom, oklch(0.40 0.06 ${fromHue} / 0.35), oklch(0.40 0.06 ${toHue} / 0.35))`
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChevronDown,
      {
        size: 14,
        style: { color: `oklch(0.42 0.05 ${midHue})` },
        className: "relative z-10 bg-background rounded-full"
      }
    )
  ] });
}
function LayerRow({ layer, config, index, isLast }) {
  var _a;
  const pct = Number(layer.completionPct);
  const { hue, chroma } = config;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `layers.item.${index + 1}`,
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border p-5 transition-smooth",
            style: {
              backgroundColor: `oklch(0.165 ${chroma * 0.15} ${hue} / 0.6)`,
              borderColor: `oklch(0.35 ${chroma * 0.5} ${hue} / 0.35)`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold",
                  style: {
                    backgroundColor: `oklch(0.22 ${chroma * 0.4} ${hue})`,
                    color: `oklch(0.78 ${chroma} ${hue})`
                  },
                  "aria-hidden": "true",
                  children: config.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "text-base font-semibold font-display truncate",
                        style: { color: `oklch(0.78 ${chroma} ${hue})` },
                        children: layer.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0",
                        style: {
                          color: `oklch(0.78 ${chroma} ${hue})`,
                          backgroundColor: `oklch(0.22 ${chroma * 0.4} ${hue})`,
                          border: `1px solid oklch(0.45 ${chroma * 0.5} ${hue} / 0.4)`
                        },
                        children: layer.statusLabel
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-lg font-bold font-mono tabular-nums flex-shrink-0",
                      style: { color: `oklch(0.78 ${chroma} ${hue})` },
                      children: [
                        pct,
                        "%"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-3", children: config.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { pct, hue, chroma, index })
              ] })
            ] })
          }
        ),
        !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DependencyConnector,
          {
            fromHue: hue,
            toHue: ((_a = LAYER_CONFIG[LAYER_ORDER[index + 1]]) == null ? void 0 : _a.hue) ?? hue
          }
        )
      ]
    }
  );
}
function OverallProgress({ layers }) {
  const avg = layers.length > 0 ? Math.round(
    layers.reduce((s, l) => s + Number(l.completionPct), 0) / layers.length
  ) : 0;
  const r = 38;
  const circ = 2 * Math.PI * r;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-center gap-5 p-5 rounded-xl border",
      style: {
        backgroundColor: "oklch(0.175 0.03 195 / 0.4)",
        borderColor: "oklch(0.35 0.08 195 / 0.3)"
      },
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 relative w-20 h-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 88 88",
              className: "w-20 h-20 -rotate-90",
              role: "img",
              "aria-labelledby": "ring-title",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "ring-title", children: "Overall AIOS stack readiness progress ring" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ring-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.62 0.18 193)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.14 195)" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "44",
                    cy: "44",
                    r,
                    fill: "none",
                    stroke: "oklch(0.22 0.04 195)",
                    strokeWidth: "7"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.circle,
                  {
                    cx: "44",
                    cy: "44",
                    r,
                    fill: "none",
                    stroke: "url(#ring-grad)",
                    strokeWidth: "7",
                    strokeLinecap: "round",
                    strokeDasharray: circ,
                    initial: { strokeDashoffset: circ },
                    animate: { strokeDashoffset: circ - avg / 100 * circ },
                    transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-0 flex items-center justify-center text-sm font-bold font-mono text-foreground", children: [
            avg,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1", children: "Overall Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold font-display text-foreground", children: "AIOS Stack Readiness" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [
            layers.filter((l) => Number(l.completionPct) >= 80).length,
            " of",
            " ",
            layers.length,
            " layers at operational threshold"
          ] })
        ] })
      ]
    }
  );
}
function LayersPage() {
  const { data: layers, isLoading, isError } = useLayers();
  const sorted = layers ? sortLayers(layers) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8", "data-ocid": "layers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header", "data-ocid": "layers.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1", children: "Infrastructure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display text-foreground", children: "Five Layers Overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block", children: "Foundation → Intelligence → Capability" })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "layers.loading_state", children: ["s1", "s2", "s3", "s4", "s5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLayerRow, {}, sk)) }),
    isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-4 rounded-xl border text-sm",
        style: {
          backgroundColor: "oklch(0.16 0.06 24 / 0.15)",
          borderColor: "oklch(0.45 0.1 24 / 0.3)",
          color: "oklch(0.78 0.14 24)"
        },
        "data-ocid": "layers.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 16, className: "flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Unable to load layer data. Showing last known state." })
        ]
      }
    ),
    !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OverallProgress, { layers: sorted }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: "Each layer of the AIOS stack builds on the one below it. Context must be established before Data can be leveraged; Intelligence requires rich Data; Automate demands proven Intelligence; and Build sits at the apex, unlocking fully custom capabilities." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: sorted.map((layer, index) => {
        const key = layer.id.toLowerCase();
        const config = LAYER_CONFIG[key] ?? {
          hue: 220,
          chroma: 0.12,
          description: "",
          icon: "○"
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          LayerRow,
          {
            layer,
            config,
            index,
            isLast: index === sorted.length - 1
          },
          layer.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "mt-6 pt-5 border-t flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground",
          style: { borderColor: "oklch(var(--border) / 0.2)" },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.7 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-wider font-medium", children: "Layer maturity:" }),
            [
              { label: "Planned", range: "0–25%", dot: "oklch(0.55 0.06 220)" },
              {
                label: "In Progress",
                range: "25–60%",
                dot: "oklch(0.65 0.14 45)"
              },
              {
                label: "Operational",
                range: "60–80%",
                dot: "oklch(0.70 0.16 155)"
              },
              {
                label: "Optimised",
                range: "80–100%",
                dot: "oklch(0.78 0.18 193)"
              }
            ].map(({ label, range, dot }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block w-2.5 h-2.5 rounded-full flex-shrink-0",
                  style: { backgroundColor: dot },
                  "aria-hidden": "true"
                }
              ),
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-50", children: [
                "(",
                range,
                ")"
              ] })
            ] }, label))
          ]
        }
      )
    ] })
  ] });
}
export {
  LayersPage as default
};
