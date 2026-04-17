import Types "../types/aios-portal";
import PortalLib "../lib/aios-portal";
import List "mo:core/List";

mixin (
  agents : List.List<Types.Agent>,
  layers : List.List<Types.Layer>,
  metricsRef : { var value : Types.Metric },
  briefRef : { var value : Types.DailyBrief },
  clientInfoRef : { var value : Types.ClientInfo },
) {

  // ── Agent queries ──────────────────────────────────────────────────────────

  public query func listAgents() : async [Types.Agent] {
    PortalLib.listAgents(agents);
  };

  public query func getAgent(id : Text) : async ?Types.Agent {
    PortalLib.getAgent(agents, id);
  };

  // ── Layer queries ──────────────────────────────────────────────────────────

  public query func listLayers() : async [Types.Layer] {
    PortalLib.listLayers(layers);
  };

  public query func getLayer(id : Text) : async ?Types.Layer {
    PortalLib.getLayer(layers, id);
  };

  // ── Metrics query ──────────────────────────────────────────────────────────

  public query func getMetrics() : async Types.Metric {
    PortalLib.getMetrics(metricsRef.value);
  };

  // ── Daily Brief query ──────────────────────────────────────────────────────

  public query func getDailyBrief() : async Types.DailyBrief {
    PortalLib.getDailyBrief(briefRef.value);
  };

  // ── Client Info query ──────────────────────────────────────────────────────

  public query func getClientInfo() : async Types.ClientInfo {
    PortalLib.getClientInfo(clientInfoRef.value);
  };

  // ── Admin update functions ─────────────────────────────────────────────────

  public shared func updateAgent(id : Text, input : Types.UpdateAgentInput) : async Bool {
    PortalLib.updateAgent(agents, id, input);
  };

  public shared func updateLayer(id : Text, input : Types.UpdateLayerInput) : async Bool {
    PortalLib.updateLayer(layers, id, input);
  };

  public shared func updateMetrics(input : Types.UpdateMetricsInput) : async () {
    PortalLib.updateMetrics(metricsRef, input);
  };

  public shared func updateDailyBrief(input : Types.UpdateDailyBriefInput) : async () {
    PortalLib.updateDailyBrief(briefRef, input);
  };

  public shared func updateClientInfo(input : Types.UpdateClientInfoInput) : async () {
    PortalLib.updateClientInfo(clientInfoRef, input);
  };
};
