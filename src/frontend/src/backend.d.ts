import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UpdateDailyBriefInput {
    title: string;
    date: string;
    recommendedActions: Array<string>;
    topPriorities: Array<string>;
    executiveSummary: string;
}
export interface UpdateLayerInput {
    completionPct: bigint;
    statusLabel: string;
}
export interface UpdateClientInfoInput {
    clientName: string;
    systemStatus: SystemStatus;
}
export interface UpdateMetricsInput {
    taskAutomationPct: number;
    taskAutomationTarget: number;
    revenuePerEmployee: number;
    awayFromDeskTrend: TrendDirection;
    awayFromDeskTarget: number;
    revenuePerEmployeeTrend: TrendDirection;
    awayFromDeskHours: number;
    taskAutomationTrend: TrendDirection;
    revenuePerEmployeeTarget: number;
}
export interface Metric {
    taskAutomationPct: number;
    taskAutomationTarget: number;
    revenuePerEmployee: number;
    awayFromDeskTrend: TrendDirection;
    awayFromDeskTarget: number;
    revenuePerEmployeeTrend: TrendDirection;
    awayFromDeskHours: number;
    taskAutomationTrend: TrendDirection;
    revenuePerEmployeeTarget: number;
}
export interface DailyBrief {
    title: string;
    date: string;
    recommendedActions: Array<string>;
    topPriorities: Array<string>;
    executiveSummary: string;
}
export interface Agent {
    id: string;
    status: AgentStatus;
    lastActivity: bigint;
    name: string;
    roleDescription: string;
}
export interface UpdateAgentInput {
    status: AgentStatus;
    lastActivity: bigint;
}
export interface ClientInfo {
    clientName: string;
    systemStatus: SystemStatus;
}
export interface Layer {
    id: string;
    completionPct: bigint;
    name: string;
    statusLabel: string;
}
export enum AgentStatus {
    Idle = "Idle",
    Active = "Active",
    Offline = "Offline"
}
export enum SystemStatus {
    Inactive = "Inactive",
    Active = "Active",
    Pending = "Pending"
}
export enum TrendDirection {
    Up = "Up",
    Down = "Down",
    Flat = "Flat"
}
export interface backendInterface {
    getAgent(id: string): Promise<Agent | null>;
    getClientInfo(): Promise<ClientInfo>;
    getDailyBrief(): Promise<DailyBrief>;
    getLayer(id: string): Promise<Layer | null>;
    getMetrics(): Promise<Metric>;
    listAgents(): Promise<Array<Agent>>;
    listLayers(): Promise<Array<Layer>>;
    updateAgent(id: string, input: UpdateAgentInput): Promise<boolean>;
    updateClientInfo(input: UpdateClientInfoInput): Promise<void>;
    updateDailyBrief(input: UpdateDailyBriefInput): Promise<void>;
    updateLayer(id: string, input: UpdateLayerInput): Promise<boolean>;
    updateMetrics(input: UpdateMetricsInput): Promise<void>;
}
