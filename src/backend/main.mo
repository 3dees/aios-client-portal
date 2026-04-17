import Types "types/aios-portal";
import List "mo:core/List";
import PortalMixin "mixins/aios-portal-api";

actor {
  // ── Agents ─────────────────────────────────────────────────────────────────

  let agents : List.List<Types.Agent> = List.fromArray([
    {
      id = "business-manager";
      name = "Business Manager";
      roleDescription = "Orchestrates business strategy, coordinates between departments, and ensures all agents are aligned to your business goals. Acts as the executive layer of your AIOS.";
      status = #Active;
      lastActivity = 0;
    },
    {
      id = "finance-manager";
      name = "Finance Manager";
      roleDescription = "Monitors financial health, tracks revenue and expenses, generates financial insights, and flags anomalies. Keeps your business financially optimised at all times.";
      status = #Active;
      lastActivity = 0;
    },
    {
      id = "content-strategist";
      name = "Content Strategist";
      roleDescription = "Plans, creates, and schedules content across channels. Maintains brand voice, identifies content opportunities, and ensures consistent messaging to your audience.";
      status = #Idle;
      lastActivity = 0;
    },
    {
      id = "operations-architect";
      name = "Operations Architect";
      roleDescription = "Designs and automates business processes, identifies inefficiencies, and implements workflow improvements. Drives operational excellence and process automation.";
      status = #Active;
      lastActivity = 0;
    },
    {
      id = "success-coach";
      name = "Success Coach";
      roleDescription = "Tracks progress toward your business goals, provides accountability check-ins, suggests strategic pivots, and celebrates milestones to keep momentum high.";
      status = #Idle;
      lastActivity = 0;
    },
    {
      id = "security-officer";
      name = "Security Officer";
      roleDescription = "Monitors systems for threats, enforces data governance policies, manages access controls, and ensures your business operations remain secure and compliant.";
      status = #Active;
      lastActivity = 0;
    },
  ]);

  // ── Layers ─────────────────────────────────────────────────────────────────

  let layers : List.List<Types.Layer> = List.fromArray([
    {
      id = "context";
      name = "Context";
      completionPct = 85;
      statusLabel = "Operational";
    },
    {
      id = "data";
      name = "Data";
      completionPct = 72;
      statusLabel = "Operational";
    },
    {
      id = "intelligence";
      name = "Intelligence";
      completionPct = 60;
      statusLabel = "In Progress";
    },
    {
      id = "automate";
      name = "Automate";
      completionPct = 45;
      statusLabel = "In Progress";
    },
    {
      id = "build";
      name = "Build";
      completionPct = 30;
      statusLabel = "Early Stage";
    },
  ]);

  // ── Metrics ────────────────────────────────────────────────────────────────

  let metricsRef = {
    var value : Types.Metric = {
      awayFromDeskHours = 2.5;
      awayFromDeskTrend = #Up;
      awayFromDeskTarget = 4.0;
      taskAutomationPct = 58.0;
      taskAutomationTrend = #Up;
      taskAutomationTarget = 60.0;
      revenuePerEmployee = 450000.0;
      revenuePerEmployeeTrend = #Flat;
      revenuePerEmployeeTarget = 500000.0;
    };
  };

  // ── Daily Brief ────────────────────────────────────────────────────────────

  let briefRef = {
    var value : Types.DailyBrief = {
      title = "Morning Intelligence Brief";
      date = "2026-04-17";
      executiveSummary = "Your AIOS has been working overnight. Task automation is up 3% this week, trending toward the 60% target. Two high-priority client proposals are ready for your review. Security Officer detected and neutralised one anomalous access attempt at 03:14 UTC. Overall system health is strong.";
      topPriorities = [
        "Review and approve two client proposals prepared by Business Manager",
        "Sign off on Q2 content calendar drafted by Content Strategist",
        "Complete onboarding checklist to unlock Intelligence layer optimisations",
      ];
      recommendedActions = [
        "Schedule a 30-minute strategy sync — Business Manager has identified a new market opportunity",
        "Approve the automated invoice workflow built by Operations Architect to save 4 hours/week",
        "Review the security incident report from last night — no action required, for awareness only",
      ];
    };
  };

  // ── Client Info ────────────────────────────────────────────────────────────

  let clientInfoRef = {
    var value : Types.ClientInfo = {
      clientName = "Acme Corp";
      systemStatus = #Active;
    };
  };

  // ── Compose ────────────────────────────────────────────────────────────────

  include PortalMixin(agents, layers, metricsRef, briefRef, clientInfoRef);
};
