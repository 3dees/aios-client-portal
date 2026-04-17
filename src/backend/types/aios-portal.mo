module {
  // ── Agent ──────────────────────────────────────────────────────────────────

  public type AgentStatus = { #Active; #Idle; #Offline };

  public type Agent = {
    id : Text;
    name : Text;
    roleDescription : Text;
    status : AgentStatus;
    lastActivity : Int; // nanoseconds (Time.now())
  };

  // ── Layer ──────────────────────────────────────────────────────────────────

  public type Layer = {
    id : Text;
    name : Text;
    completionPct : Nat; // 0–100
    statusLabel : Text;
  };

  // ── Metrics ────────────────────────────────────────────────────────────────

  public type TrendDirection = { #Up; #Down; #Flat };

  public type Metric = {
    awayFromDeskHours : Float;
    awayFromDeskTrend : TrendDirection;
    awayFromDeskTarget : Float;
    taskAutomationPct : Float;
    taskAutomationTrend : TrendDirection;
    taskAutomationTarget : Float;
    revenuePerEmployee : Float;
    revenuePerEmployeeTrend : TrendDirection;
    revenuePerEmployeeTarget : Float;
  };

  // ── Daily Brief ────────────────────────────────────────────────────────────

  public type DailyBrief = {
    title : Text;
    date : Text; // ISO date string, e.g. "2026-04-17"
    executiveSummary : Text;
    topPriorities : [Text];
    recommendedActions : [Text];
  };

  // ── Client Info ────────────────────────────────────────────────────────────

  public type SystemStatus = { #Active; #Inactive; #Pending };

  public type ClientInfo = {
    clientName : Text;
    systemStatus : SystemStatus;
  };

  // ── Input types (for admin updates) ───────────────────────────────────────

  public type UpdateAgentInput = {
    status : AgentStatus;
    lastActivity : Int;
  };

  public type UpdateLayerInput = {
    completionPct : Nat;
    statusLabel : Text;
  };

  public type UpdateMetricsInput = Metric;

  public type UpdateDailyBriefInput = DailyBrief;

  public type UpdateClientInfoInput = ClientInfo;
};
