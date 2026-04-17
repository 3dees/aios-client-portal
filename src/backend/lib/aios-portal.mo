import Types "../types/aios-portal";
import List "mo:core/List";

module {
  // ── Agent logic ────────────────────────────────────────────────────────────

  public func listAgents(agents : List.List<Types.Agent>) : [Types.Agent] {
    agents.toArray();
  };

  public func getAgent(agents : List.List<Types.Agent>, id : Text) : ?Types.Agent {
    agents.find(func(a) { a.id == id });
  };

  public func updateAgent(
    agents : List.List<Types.Agent>,
    id : Text,
    input : Types.UpdateAgentInput,
  ) : Bool {
    let found = agents.findIndex(func(a) { a.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = agents.at(idx);
        agents.put(idx, { existing with status = input.status; lastActivity = input.lastActivity });
        true;
      };
    };
  };

  // ── Layer logic ────────────────────────────────────────────────────────────

  public func listLayers(layers : List.List<Types.Layer>) : [Types.Layer] {
    layers.toArray();
  };

  public func getLayer(layers : List.List<Types.Layer>, id : Text) : ?Types.Layer {
    layers.find(func(l) { l.id == id });
  };

  public func updateLayer(
    layers : List.List<Types.Layer>,
    id : Text,
    input : Types.UpdateLayerInput,
  ) : Bool {
    let found = layers.findIndex(func(l) { l.id == id });
    switch (found) {
      case null { false };
      case (?idx) {
        let existing = layers.at(idx);
        layers.put(idx, { existing with completionPct = input.completionPct; statusLabel = input.statusLabel });
        true;
      };
    };
  };

  // ── Metrics logic ──────────────────────────────────────────────────────────

  public func getMetrics(metrics : Types.Metric) : Types.Metric {
    metrics;
  };

  public func updateMetrics(
    metricsRef : { var value : Types.Metric },
    input : Types.UpdateMetricsInput,
  ) {
    metricsRef.value := input;
  };

  // ── Daily Brief logic ──────────────────────────────────────────────────────

  public func getDailyBrief(brief : Types.DailyBrief) : Types.DailyBrief {
    brief;
  };

  public func updateDailyBrief(
    briefRef : { var value : Types.DailyBrief },
    input : Types.UpdateDailyBriefInput,
  ) {
    briefRef.value := input;
  };

  // ── Client Info logic ──────────────────────────────────────────────────────

  public func getClientInfo(info : Types.ClientInfo) : Types.ClientInfo {
    info;
  };

  public func updateClientInfo(
    infoRef : { var value : Types.ClientInfo },
    input : Types.UpdateClientInfoInput,
  ) {
    infoRef.value := input;
  };
};
