import type { AgentStatus, SystemStatus } from "@/types/aios";
import { agentStatusKind, systemStatusKind } from "@/types/aios";

interface AgentStatusBadgeProps {
  status: AgentStatus;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const kind = agentStatusKind(status);
  const map = {
    Active: { cls: "badge-active", dot: "bg-emerald-400", label: "Active" },
    Idle: { cls: "badge-idle", dot: "bg-amber-400", label: "Idle" },
    Offline: { cls: "badge-offline", dot: "bg-red-400", label: "Offline" },
  } as const;
  const { cls, dot, label } = map[kind] ?? {
    cls: "opacity-50 text-muted-foreground",
    dot: "bg-muted-foreground",
    label: kind ?? "Unknown",
  };
  return (
    <span className={cls}>
      <span className={`${dot} pulse-dot`} />
      {label}
    </span>
  );
}

interface SystemStatusBadgeProps {
  status: SystemStatus;
}

export function SystemStatusBadge({ status }: SystemStatusBadgeProps) {
  const kind = systemStatusKind(status);
  const map = {
    Active: { cls: "badge-active", dot: "bg-emerald-400", label: "Active" },
    Inactive: { cls: "badge-offline", dot: "bg-red-400", label: "Inactive" },
    Pending: { cls: "badge-pending", dot: "bg-blue-400", label: "Pending" },
  } as const;
  const { cls, dot, label } = map[kind] ?? {
    cls: "opacity-50 text-muted-foreground",
    dot: "bg-muted-foreground",
    label: kind ?? "Unknown",
  };
  return (
    <span className={cls}>
      <span className={`${dot} pulse-dot`} />
      {label}
    </span>
  );
}
