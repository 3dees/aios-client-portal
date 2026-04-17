import { type Backend, createActor } from "@/backend";
import type {
  Agent,
  ClientInfo,
  DailyBrief,
  Layer,
  Metric,
  UpdateAgentInput,
  UpdateClientInfoInput,
  UpdateDailyBriefInput,
  UpdateLayerInput,
  UpdateMetricsInput,
} from "@/types/aios";
import { useActor as useActorBase } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ── Actor helper ──────────────────────────────────────────────────────────────

function useActor() {
  return useActorBase<Backend>(createActor);
}

// ── Fallback / seed data (shown while backend is empty) ───────────────────────

const SEED_AGENTS: Agent[] = [
  {
    id: "business-manager",
    name: "Business Manager",
    roleDescription:
      "Oversees overall business strategy, monitors KPIs, and coordinates the full agent team to keep operations aligned with company goals.",
    status: { __kind__: "Active" },
    lastActivity: BigInt(Date.now()) - BigInt(5 * 60_000),
  },
  {
    id: "finance-manager",
    name: "Finance Manager",
    roleDescription:
      "Tracks revenue, expenses, cash-flow forecasts, and flags anomalies in real time so you never face a surprise at month-end.",
    status: { __kind__: "Active" },
    lastActivity: BigInt(Date.now()) - BigInt(12 * 60_000),
  },
  {
    id: "content-strategist",
    name: "Content Strategist",
    roleDescription:
      "Plans, drafts, and schedules content across channels — from social posts to long-form articles — calibrated to your brand voice.",
    status: { __kind__: "Idle" },
    lastActivity: BigInt(Date.now()) - BigInt(45 * 60_000),
  },
  {
    id: "operations-architect",
    name: "Operations Architect",
    roleDescription:
      "Designs and automates workflows, removes bottlenecks, and builds the operational scaffolding that lets your business scale.",
    status: { __kind__: "Active" },
    lastActivity: BigInt(Date.now()) - BigInt(3 * 60_000),
  },
  {
    id: "success-coach",
    name: "Success Coach",
    roleDescription:
      "Monitors client health scores, surfaces at-risk accounts, and proactively generates outreach plans to maximise retention.",
    status: { __kind__: "Idle" },
    lastActivity: BigInt(Date.now()) - BigInt(2 * 3_600_000),
  },
  {
    id: "security-officer",
    name: "Security Officer",
    roleDescription:
      "Continuously audits access permissions, data handling practices, and system integrity to keep your business and clients safe.",
    status: { __kind__: "Active" },
    lastActivity: BigInt(Date.now()) - BigInt(8 * 60_000),
  },
];

const SEED_LAYERS: Layer[] = [
  {
    id: "context",
    name: "Context",
    completionPct: BigInt(92),
    statusLabel: "Fully mapped",
  },
  {
    id: "data",
    name: "Data",
    completionPct: BigInt(78),
    statusLabel: "Ingesting",
  },
  {
    id: "intelligence",
    name: "Intelligence",
    completionPct: BigInt(65),
    statusLabel: "Training",
  },
  {
    id: "automate",
    name: "Automate",
    completionPct: BigInt(48),
    statusLabel: "In progress",
  },
  {
    id: "build",
    name: "Build",
    completionPct: BigInt(30),
    statusLabel: "Planned",
  },
];

const SEED_METRICS: Metric = {
  awayFromDeskHours: 5.5,
  awayFromDeskTrend: { __kind__: "Up" },
  awayFromDeskTarget: 8,
  taskAutomationPct: 58,
  taskAutomationTrend: { __kind__: "Up" },
  taskAutomationTarget: 60,
  revenuePerEmployee: 187_000,
  revenuePerEmployeeTrend: { __kind__: "Up" },
  revenuePerEmployeeTarget: 200_000,
};

const SEED_BRIEF: DailyBrief = {
  title: "Good Morning — Your AIOS Briefing",
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  executiveSummary:
    "Your six agents worked through the night. Revenue pipeline is trending +12% month-over-month, three automation workflows completed deployment, and the content calendar for next week has been fully drafted and queued.",
  topPriorities: [
    "Review the Q3 cash-flow forecast flagged by Finance Manager",
    "Approve the social content batch for Tuesday–Thursday",
    "Schedule a check-in with the two at-risk accounts surfaced by Success Coach",
  ],
  recommendedActions: [
    "Allocate 30 min to review the Operations Architect's new onboarding workflow proposal",
    "Confirm the budget threshold increase requested for the content tools subscription",
    "Read the Security Officer's access audit summary (no critical findings)",
  ],
};

const SEED_CLIENT: ClientInfo = {
  clientName: "Acme Corp",
  systemStatus: { __kind__: "Active" },
};

// ── Query keys ────────────────────────────────────────────────────────────────

export const QUERY_KEYS = {
  agents: ["agents"] as const,
  layers: ["layers"] as const,
  metrics: ["metrics"] as const,
  brief: ["dailyBrief"] as const,
  client: ["clientInfo"] as const,
};

// ── Hooks ─────────────────────────────────────────────────────────────────────

export function useAgents() {
  const { actor, isFetching } = useActor();
  return useQuery<Agent[]>({
    queryKey: QUERY_KEYS.agents,
    queryFn: async () => {
      if (!actor) return SEED_AGENTS;
      try {
        const result = await (
          actor as unknown as { listAgents: () => Promise<Agent[]> }
        ).listAgents();
        return result.length > 0 ? result : SEED_AGENTS;
      } catch {
        return SEED_AGENTS;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useLayers() {
  const { actor, isFetching } = useActor();
  return useQuery<Layer[]>({
    queryKey: QUERY_KEYS.layers,
    queryFn: async () => {
      if (!actor) return SEED_LAYERS;
      try {
        const result = await (
          actor as unknown as { listLayers: () => Promise<Layer[]> }
        ).listLayers();
        return result.length > 0 ? result : SEED_LAYERS;
      } catch {
        return SEED_LAYERS;
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useMetrics() {
  const { actor, isFetching } = useActor();
  return useQuery<Metric>({
    queryKey: QUERY_KEYS.metrics,
    queryFn: async () => {
      if (!actor) return SEED_METRICS;
      try {
        return await (
          actor as unknown as { getMetrics: () => Promise<Metric> }
        ).getMetrics();
      } catch {
        return SEED_METRICS;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useDailyBrief() {
  const { actor, isFetching } = useActor();
  return useQuery<DailyBrief>({
    queryKey: QUERY_KEYS.brief,
    queryFn: async () => {
      if (!actor) return SEED_BRIEF;
      try {
        return await (
          actor as unknown as { getDailyBrief: () => Promise<DailyBrief> }
        ).getDailyBrief();
      } catch {
        return SEED_BRIEF;
      }
    },
    enabled: !isFetching,
    staleTime: 300_000,
  });
}

export function useClientInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ClientInfo>({
    queryKey: QUERY_KEYS.client,
    queryFn: async () => {
      if (!actor) return SEED_CLIENT;
      try {
        return await (
          actor as unknown as { getClientInfo: () => Promise<ClientInfo> }
        ).getClientInfo();
      } catch {
        return SEED_CLIENT;
      }
    },
    enabled: !isFetching,
    staleTime: 120_000,
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function useUpdateAgent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: string; input: UpdateAgentInput }) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          updateAgent: (
            id: string,
            input: UpdateAgentInput,
          ) => Promise<boolean>;
        }
      ).updateAgent(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.agents }),
  });
}

export function useUpdateLayer() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: string; input: UpdateLayerInput }) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          updateLayer: (
            id: string,
            input: UpdateLayerInput,
          ) => Promise<boolean>;
        }
      ).updateLayer(id, input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.layers }),
  });
}

export function useUpdateMetrics() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateMetricsInput) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          updateMetrics: (input: UpdateMetricsInput) => Promise<void>;
        }
      ).updateMetrics(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.metrics }),
  });
}

export function useUpdateDailyBrief() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateDailyBriefInput) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          updateDailyBrief: (input: UpdateDailyBriefInput) => Promise<void>;
        }
      ).updateDailyBrief(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.brief }),
  });
}

export function useUpdateClientInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateClientInfoInput) => {
      if (!actor) throw new Error("Actor not ready");
      return (
        actor as unknown as {
          updateClientInfo: (input: UpdateClientInfoInput) => Promise<void>;
        }
      ).updateClientInfo(input);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: QUERY_KEYS.client }),
  });
}
