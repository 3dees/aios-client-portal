// ── Agent ─────────────────────────────────────────────────────────────────────

export type AgentStatus =
  | { __kind__: "Active" }
  | { __kind__: "Idle" }
  | { __kind__: "Offline" };

export interface Agent {
  id: string;
  name: string;
  roleDescription: string;
  status: AgentStatus;
  lastActivity: bigint;
}

export interface UpdateAgentInput {
  name?: string[];
  roleDescription?: string[];
  status?: AgentStatus[];
}

// ── Layer ─────────────────────────────────────────────────────────────────────

export interface Layer {
  id: string;
  name: string;
  completionPct: bigint;
  statusLabel: string;
}

export interface UpdateLayerInput {
  name?: string[];
  completionPct?: bigint[];
  statusLabel?: string[];
}

// ── Metric ────────────────────────────────────────────────────────────────────

export type TrendDirection =
  | { __kind__: "Up" }
  | { __kind__: "Down" }
  | { __kind__: "Flat" };

export interface Metric {
  awayFromDeskHours: number;
  awayFromDeskTrend: TrendDirection;
  awayFromDeskTarget: number;
  taskAutomationPct: number;
  taskAutomationTrend: TrendDirection;
  taskAutomationTarget: number;
  revenuePerEmployee: number;
  revenuePerEmployeeTrend: TrendDirection;
  revenuePerEmployeeTarget: number;
}

export interface UpdateMetricsInput {
  awayFromDeskHours?: number[];
  awayFromDeskTrend?: TrendDirection[];
  awayFromDeskTarget?: number[];
  taskAutomationPct?: number[];
  taskAutomationTrend?: TrendDirection[];
  taskAutomationTarget?: number[];
  revenuePerEmployee?: number[];
  revenuePerEmployeeTrend?: TrendDirection[];
  revenuePerEmployeeTarget?: number[];
}

// ── Daily Brief ───────────────────────────────────────────────────────────────

export interface DailyBrief {
  title: string;
  date: string;
  executiveSummary: string;
  topPriorities: string[];
  recommendedActions: string[];
}

export interface UpdateDailyBriefInput {
  title?: string[];
  date?: string[];
  executiveSummary?: string[];
  topPriorities?: string[][];
  recommendedActions?: string[][];
}

// ── Client Info ───────────────────────────────────────────────────────────────

export type SystemStatus =
  | { __kind__: "Active" }
  | { __kind__: "Inactive" }
  | { __kind__: "Pending" };

export interface ClientInfo {
  clientName: string;
  systemStatus: SystemStatus;
}

export interface UpdateClientInfoInput {
  clientName?: string[];
  systemStatus?: SystemStatus[];
}

// ── Utility helpers ───────────────────────────────────────────────────────────

export function agentStatusKind(
  status: AgentStatus,
): "Active" | "Idle" | "Offline" {
  return status.__kind__ as "Active" | "Idle" | "Offline";
}

export function trendKind(trend: TrendDirection): "Up" | "Down" | "Flat" {
  return trend.__kind__ as "Up" | "Down" | "Flat";
}

export function systemStatusKind(
  status: SystemStatus,
): "Active" | "Inactive" | "Pending" {
  return status.__kind__ as "Active" | "Inactive" | "Pending";
}
