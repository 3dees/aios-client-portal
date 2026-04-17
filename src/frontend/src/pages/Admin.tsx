import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useAgents,
  useClientInfo,
  useDailyBrief,
  useLayers,
  useMetrics,
  useUpdateAgent,
  useUpdateClientInfo,
  useUpdateDailyBrief,
  useUpdateLayer,
  useUpdateMetrics,
} from "@/hooks/useAios";
import type {
  AgentStatus,
  SystemStatus,
  TrendDirection,
  UpdateAgentInput,
} from "@/types/aios";
import { agentStatusKind, systemStatusKind, trendKind } from "@/types/aios";
import {
  BarChart3,
  Bot,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Plus,
  Save,
  Settings2,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ── Conversion helpers ────────────────────────────────────────────────────────

function agentStatusToVariant(s: string): AgentStatus {
  if (s === "Active") return { __kind__: "Active" };
  if (s === "Idle") return { __kind__: "Idle" };
  return { __kind__: "Offline" };
}

function systemStatusToVariant(s: string): SystemStatus {
  if (s === "Active") return { __kind__: "Active" };
  if (s === "Inactive") return { __kind__: "Inactive" };
  return { __kind__: "Pending" };
}

function trendToVariant(s: string): TrendDirection {
  if (s === "Up") return { __kind__: "Up" };
  if (s === "Down") return { __kind__: "Down" };
  return { __kind__: "Flat" };
}

// ── Shared section wrapper ────────────────────────────────────────────────────

function AdminSection({
  title,
  children,
  onSave,
  saving,
  ocid,
}: {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
  ocid: string;
}) {
  return (
    <div
      className="rounded-lg border bg-card p-6 space-y-5"
      style={{ borderColor: "oklch(var(--border) / 0.5)" }}
    >
      <h3 className="text-base font-semibold text-foreground font-display">
        {title}
      </h3>
      <Separator style={{ backgroundColor: "oklch(var(--border) / 0.3)" }} />
      {children}
      <div className="flex justify-end pt-2">
        <Button
          onClick={onSave}
          disabled={saving}
          data-ocid={`${ocid}.save_button`}
          className="gap-2"
          style={{ minWidth: 130 }}
        >
          {saving ? (
            <span
              className="flex items-center gap-2"
              data-ocid={`${ocid}.loading_state`}
            >
              <span className="w-4 h-4 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ── Dynamic list editor ───────────────────────────────────────────────────────

function ListEditor({
  label,
  items,
  onChange,
  ocid,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  ocid: string;
}) {
  function update(idx: number, val: string) {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  }
  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: list items have no stable id
          <div key={`list-item-${idx}`} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={`Item ${idx + 1}`}
              data-ocid={`${ocid}.item.${idx + 1}`}
              className="flex-1 bg-background text-sm"
              style={{ borderColor: "oklch(var(--input) / 0.8)" }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => remove(idx)}
              data-ocid={`${ocid}.delete_button.${idx + 1}`}
              className="shrink-0 text-muted-foreground hover:text-destructive"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, ""])}
        data-ocid={`${ocid}.add_button`}
        className="gap-2 text-xs border-dashed"
        style={{ borderColor: "oklch(var(--border) / 0.6)" }}
      >
        <Plus className="w-3.5 h-3.5" />
        Add item
      </Button>
    </div>
  );
}

// ── Metric field group ────────────────────────────────────────────────────────

function MetricGroup({
  label,
  value,
  onChange,
  target,
  onTargetChange,
  trend,
  onTrendChange,
  ocid,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  target: number;
  onTargetChange: (v: number) => void;
  trend: string;
  onTrendChange: (v: string) => void;
  ocid: string;
  unit?: string;
}) {
  return (
    <div
      className="rounded-md border p-4 space-y-3"
      style={{
        borderColor: "oklch(var(--border) / 0.4)",
        background: "oklch(var(--background) / 0.5)",
      }}
    >
      <p className="text-sm font-medium text-foreground">
        {label}
        {unit && (
          <span className="ml-1.5 text-xs text-muted-foreground font-normal">
            ({unit})
          </span>
        )}
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Current</Label>
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
            data-ocid={`${ocid}.input`}
            className="bg-background text-sm"
            style={{ borderColor: "oklch(var(--input) / 0.8)" }}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Target</Label>
          <Input
            type="number"
            value={target}
            onChange={(e) =>
              onTargetChange(Number.parseFloat(e.target.value) || 0)
            }
            data-ocid={`${ocid}.target.input`}
            className="bg-background text-sm"
            style={{ borderColor: "oklch(var(--input) / 0.8)" }}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Trend</Label>
          <Select value={trend} onValueChange={onTrendChange}>
            <SelectTrigger
              data-ocid={`${ocid}.trend.select`}
              className="bg-background text-sm"
              style={{ borderColor: "oklch(var(--input) / 0.8)" }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Up">↑ Up</SelectItem>
              <SelectItem value="Down">↓ Down</SelectItem>
              <SelectItem value="Flat">→ Flat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

// ── Tab skeleton ──────────────────────────────────────────────────────────────

function TabSkeleton() {
  return (
    <div className="space-y-4" data-ocid="admin.loading_state">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-20 w-full rounded-lg" />
      ))}
    </div>
  );
}

// ── Tab: Client Info ──────────────────────────────────────────────────────────

function ClientInfoTab() {
  const { data, isLoading } = useClientInfo();
  const mutation = useUpdateClientInfo();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    if (data) {
      setName(data.clientName);
      setStatus(systemStatusKind(data.systemStatus));
    }
  }, [data]);

  async function handleSave() {
    try {
      await mutation.mutateAsync({
        clientName: [name],
        systemStatus: [systemStatusToVariant(status)],
      });
      toast.success("Client info updated successfully.");
    } catch {
      toast.error("Failed to save client info.");
    }
  }

  if (isLoading) return <TabSkeleton />;

  return (
    <AdminSection
      title="Client Information"
      onSave={handleSave}
      saving={mutation.isPending}
      ocid="admin.client"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="client-name"
            className="text-sm text-muted-foreground"
          >
            Client Name
          </Label>
          <Input
            id="client-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Acme Corp"
            data-ocid="admin.client.name.input"
            className="bg-background"
            style={{ borderColor: "oklch(var(--input) / 0.8)" }}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">System Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger
              data-ocid="admin.client.status.select"
              className="bg-background"
              style={{ borderColor: "oklch(var(--input) / 0.8)" }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </AdminSection>
  );
}

// ── Tab: Agents ───────────────────────────────────────────────────────────────

type AgentDraft = {
  id: string;
  name: string;
  status: string;
  lastActivity: string;
};

function AgentsTab() {
  const { data, isLoading } = useAgents();
  const mutation = useUpdateAgent();
  const [drafts, setDrafts] = useState<AgentDraft[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setDrafts(
        data.map((a) => ({
          id: a.id,
          name: a.name,
          status: agentStatusKind(a.status),
          lastActivity: new Date(Number(a.lastActivity))
            .toISOString()
            .slice(0, 16),
        })),
      );
    }
  }, [data]);

  function update(id: string, field: keyof AgentDraft, val: string) {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: val } : d)),
    );
  }

  async function handleSave(draft: AgentDraft) {
    setSaving(draft.id);
    try {
      const input: UpdateAgentInput = {
        status: [agentStatusToVariant(draft.status)],
      };
      await mutation.mutateAsync({ id: draft.id, input });
      toast.success(`${draft.name} updated.`);
    } catch {
      toast.error(`Failed to update ${draft.name}.`);
    } finally {
      setSaving(null);
    }
  }

  if (isLoading) return <TabSkeleton />;

  return (
    <div className="space-y-3" data-ocid="admin.agents.list">
      {drafts.map((draft, idx) => {
        const isOpen = expanded === draft.id;
        return (
          <div
            key={draft.id}
            className="rounded-lg border bg-card overflow-hidden"
            data-ocid={`admin.agents.item.${idx + 1}`}
            style={{ borderColor: "oklch(var(--border) / 0.5)" }}
          >
            {/* Row header */}
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : draft.id)}
              data-ocid={`admin.agents.toggle.${idx + 1}`}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-smooth"
              style={{ background: "transparent" }}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-sm text-foreground">
                  {draft.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={
                    draft.status === "Active"
                      ? "badge-active"
                      : draft.status === "Idle"
                        ? "badge-idle"
                        : "badge-offline"
                  }
                >
                  {draft.status}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded form */}
            {isOpen && (
              <div
                className="px-5 pb-5 space-y-4 border-t"
                style={{
                  borderColor: "oklch(var(--border) / 0.3)",
                  background: "oklch(var(--background) / 0.4)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Agent Status
                    </Label>
                    <Select
                      value={draft.status}
                      onValueChange={(v) => update(draft.id, "status", v)}
                    >
                      <SelectTrigger
                        data-ocid={`admin.agents.status.select.${idx + 1}`}
                        className="bg-background text-sm"
                        style={{ borderColor: "oklch(var(--input) / 0.8)" }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Idle">Idle</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Last Activity (local time)
                    </Label>
                    <Input
                      type="datetime-local"
                      value={draft.lastActivity}
                      onChange={(e) =>
                        update(draft.id, "lastActivity", e.target.value)
                      }
                      data-ocid={`admin.agents.activity.input.${idx + 1}`}
                      className="bg-background text-sm"
                      style={{ borderColor: "oklch(var(--input) / 0.8)" }}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => handleSave(draft)}
                    disabled={saving === draft.id}
                    data-ocid={`admin.agents.save_button.${idx + 1}`}
                    className="gap-2"
                  >
                    {saving === draft.id ? (
                      <span
                        className="flex items-center gap-2"
                        data-ocid={`admin.agents.loading_state.${idx + 1}`}
                      >
                        <span className="w-3 h-3 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin" />
                        Saving…
                      </span>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        Save Agent
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Tab: Layers ───────────────────────────────────────────────────────────────

type LayerDraft = {
  id: string;
  name: string;
  completionPct: number;
  statusLabel: string;
};

function LayersTab() {
  const { data, isLoading } = useLayers();
  const mutation = useUpdateLayer();
  const [drafts, setDrafts] = useState<LayerDraft[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setDrafts(
        data.map((l) => ({
          id: l.id,
          name: l.name,
          completionPct: Number(l.completionPct),
          statusLabel: l.statusLabel,
        })),
      );
    }
  }, [data]);

  function update(id: string, field: keyof LayerDraft, val: string | number) {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: val } : d)),
    );
  }

  async function handleSave(draft: LayerDraft) {
    setSaving(draft.id);
    try {
      await mutation.mutateAsync({
        id: draft.id,
        input: {
          completionPct: [BigInt(Math.round(draft.completionPct))],
          statusLabel: [draft.statusLabel],
        },
      });
      toast.success(`${draft.name} layer updated.`);
    } catch {
      toast.error(`Failed to update ${draft.name}.`);
    } finally {
      setSaving(null);
    }
  }

  if (isLoading) return <TabSkeleton />;

  return (
    <div className="space-y-4">
      {drafts.map((draft, idx) => (
        <div
          key={draft.id}
          className="rounded-lg border bg-card p-5 space-y-4"
          data-ocid={`admin.layers.item.${idx + 1}`}
          style={{ borderColor: "oklch(var(--border) / 0.5)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span className="font-medium text-sm text-foreground">
                {draft.name}
              </span>
            </div>
            <span className="text-xs font-mono text-primary font-semibold">
              {draft.completionPct}%
            </span>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Completion % (0–100)
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={draft.completionPct}
                onChange={(e) =>
                  update(
                    draft.id,
                    "completionPct",
                    Number.parseInt(e.target.value),
                  )
                }
                data-ocid={`admin.layers.pct.input.${idx + 1}`}
                className="flex-1 accent-primary h-2 cursor-pointer"
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={draft.completionPct}
                onChange={(e) =>
                  update(
                    draft.id,
                    "completionPct",
                    Number.parseInt(e.target.value) || 0,
                  )
                }
                className="w-20 text-sm bg-background text-center"
                style={{ borderColor: "oklch(var(--input) / 0.8)" }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Status Label
            </Label>
            <Input
              value={draft.statusLabel}
              onChange={(e) => update(draft.id, "statusLabel", e.target.value)}
              placeholder="e.g. In progress"
              data-ocid={`admin.layers.label.input.${idx + 1}`}
              className="bg-background text-sm"
              style={{ borderColor: "oklch(var(--input) / 0.8)" }}
            />
          </div>

          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={() => handleSave(draft)}
              disabled={saving === draft.id}
              data-ocid={`admin.layers.save_button.${idx + 1}`}
              className="gap-2"
            >
              {saving === draft.id ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid={`admin.layers.loading_state.${idx + 1}`}
                >
                  <span className="w-3 h-3 border-2 border-t-transparent border-primary-foreground rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Save Layer
                </>
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Metrics ──────────────────────────────────────────────────────────────

function MetricsTab() {
  const { data, isLoading } = useMetrics();
  const mutation = useUpdateMetrics();

  const [deskHours, setDeskHours] = useState(5.5);
  const [deskTarget, setDeskTarget] = useState(8);
  const [deskTrend, setDeskTrend] = useState("Up");
  const [taskPct, setTaskPct] = useState(58);
  const [taskTarget, setTaskTarget] = useState(60);
  const [taskTrend, setTaskTrend] = useState("Up");
  const [revPer, setRevPer] = useState(187000);
  const [revTarget, setRevTarget] = useState(200000);
  const [revTrend, setRevTrend] = useState("Up");

  useEffect(() => {
    if (data) {
      setDeskHours(data.awayFromDeskHours);
      setDeskTarget(data.awayFromDeskTarget);
      setDeskTrend(trendKind(data.awayFromDeskTrend));
      setTaskPct(data.taskAutomationPct);
      setTaskTarget(data.taskAutomationTarget);
      setTaskTrend(trendKind(data.taskAutomationTrend));
      setRevPer(data.revenuePerEmployee);
      setRevTarget(data.revenuePerEmployeeTarget);
      setRevTrend(trendKind(data.revenuePerEmployeeTrend));
    }
  }, [data]);

  async function handleSave() {
    try {
      await mutation.mutateAsync({
        awayFromDeskHours: [deskHours],
        awayFromDeskTarget: [deskTarget],
        awayFromDeskTrend: [trendToVariant(deskTrend)],
        taskAutomationPct: [taskPct],
        taskAutomationTarget: [taskTarget],
        taskAutomationTrend: [trendToVariant(taskTrend)],
        revenuePerEmployee: [revPer],
        revenuePerEmployeeTarget: [revTarget],
        revenuePerEmployeeTrend: [trendToVariant(revTrend)],
      });
      toast.success("Metrics updated successfully.");
    } catch {
      toast.error("Failed to save metrics.");
    }
  }

  if (isLoading) return <TabSkeleton />;

  return (
    <AdminSection
      title="Results Metrics"
      onSave={handleSave}
      saving={mutation.isPending}
      ocid="admin.metrics"
    >
      <div className="space-y-4">
        <MetricGroup
          label="Away-From-Desk Autonomy"
          value={deskHours}
          onChange={setDeskHours}
          target={deskTarget}
          onTargetChange={setDeskTarget}
          trend={deskTrend}
          onTrendChange={setDeskTrend}
          ocid="admin.metrics.desk"
          unit="hrs/day"
        />
        <MetricGroup
          label="Task Automation"
          value={taskPct}
          onChange={setTaskPct}
          target={taskTarget}
          onTargetChange={setTaskTarget}
          trend={taskTrend}
          onTrendChange={setTaskTrend}
          ocid="admin.metrics.task"
          unit="%"
        />
        <MetricGroup
          label="Revenue Per Employee"
          value={revPer}
          onChange={setRevPer}
          target={revTarget}
          onTargetChange={setRevTarget}
          trend={revTrend}
          onTrendChange={setRevTrend}
          ocid="admin.metrics.revenue"
          unit="$"
        />
      </div>
    </AdminSection>
  );
}

// ── Tab: Daily Brief ──────────────────────────────────────────────────────────

function DailyBriefTab() {
  const { data, isLoading } = useDailyBrief();
  const mutation = useUpdateDailyBrief();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDate(data.date);
      setSummary(data.executiveSummary);
      setPriorities(data.topPriorities);
      setActions(data.recommendedActions);
    }
  }, [data]);

  async function handleSave() {
    try {
      await mutation.mutateAsync({
        title: [title],
        date: [date],
        executiveSummary: [summary],
        topPriorities: [priorities],
        recommendedActions: [actions],
      });
      toast.success("Daily brief updated successfully.");
    } catch {
      toast.error("Failed to save daily brief.");
    }
  }

  if (isLoading) return <TabSkeleton />;

  return (
    <AdminSection
      title="Morning Briefing Content"
      onSave={handleSave}
      saving={mutation.isPending}
      ocid="admin.brief"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">Brief Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Good Morning — Your AIOS Briefing"
              data-ocid="admin.brief.title.input"
              className="bg-background"
              style={{ borderColor: "oklch(var(--input) / 0.8)" }}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">Date Label</Label>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Friday, April 18, 2025"
              data-ocid="admin.brief.date.input"
              className="bg-background"
              style={{ borderColor: "oklch(var(--input) / 0.8)" }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">
            Executive Summary
          </Label>
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="High-level summary of overnight activity…"
            data-ocid="admin.brief.summary.textarea"
            rows={4}
            className="bg-background resize-none text-sm"
            style={{ borderColor: "oklch(var(--input) / 0.8)" }}
          />
        </div>

        <Separator style={{ backgroundColor: "oklch(var(--border) / 0.3)" }} />

        <ListEditor
          label="Top Priorities"
          items={priorities}
          onChange={setPriorities}
          ocid="admin.brief.priorities"
        />

        <ListEditor
          label="Recommended Actions"
          items={actions}
          onChange={setActions}
          ocid="admin.brief.actions"
        />
      </div>
    </AdminSection>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "client", label: "Client Info", Icon: User },
  { id: "agents", label: "Agents", Icon: Bot },
  { id: "layers", label: "Layers", Icon: Layers },
  { id: "metrics", label: "Metrics", Icon: BarChart3 },
  { id: "brief", label: "Daily Brief", Icon: FileText },
];

export default function Admin() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8 space-y-8"
      data-ocid="admin.page"
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: "oklch(var(--primary) / 0.15)",
            border: "1px solid oklch(var(--primary) / 0.3)",
          }}
        >
          <Settings2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Management Panel
          </h1>
          <p className="text-sm text-muted-foreground">
            Update agent statuses, metrics, and brief content without code
            changes.
          </p>
        </div>
      </div>

      {/* Info banner */}
      <div
        className="flex items-start gap-3 rounded-lg border p-4 text-sm"
        style={{
          background: "oklch(var(--primary) / 0.07)",
          borderColor: "oklch(var(--primary) / 0.2)",
        }}
      >
        <span className="text-primary mt-0.5 text-base leading-none">ℹ</span>
        <p className="text-muted-foreground leading-relaxed">
          Changes are persisted immediately. The client portal reflects updates
          on next page load. Each section saves independently — click{" "}
          <strong className="text-foreground">Save Changes</strong> in the
          relevant tab.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="client" data-ocid="admin.tabs">
        <TabsList
          className="grid w-full mb-6 h-auto p-1 gap-1"
          style={{
            gridTemplateColumns: `repeat(${TABS.length}, minmax(0, 1fr))`,
            background: "oklch(var(--card) / 1)",
            border: "1px solid oklch(var(--border) / 0.5)",
            borderRadius: "0.625rem",
          }}
        >
          {TABS.map(({ id, label, Icon }) => (
            <TabsTrigger
              key={id}
              value={id}
              data-ocid={`admin.${id}.tab`}
              className="flex items-center gap-1.5 text-xs sm:text-sm py-2 px-2 sm:px-3 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="client" data-ocid="admin.client.panel">
          <ClientInfoTab />
        </TabsContent>
        <TabsContent value="agents" data-ocid="admin.agents.panel">
          <AgentsTab />
        </TabsContent>
        <TabsContent value="layers" data-ocid="admin.layers.panel">
          <LayersTab />
        </TabsContent>
        <TabsContent value="metrics" data-ocid="admin.metrics.panel">
          <MetricsTab />
        </TabsContent>
        <TabsContent value="brief" data-ocid="admin.brief.panel">
          <DailyBriefTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
