import { SystemStatusBadge } from "@/components/ui/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { useClientInfo } from "@/hooks/useAios";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  FileText,
  Layers,
  LayoutDashboard,
  Settings2,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "nav.dashboard_link",
  },
  { to: "/agents", label: "Agents", icon: Bot, ocid: "nav.agents_link" },
  {
    to: "/layers",
    label: "Five Layers",
    icon: Layers,
    ocid: "nav.layers_link",
  },
  {
    to: "/results",
    label: "Results",
    icon: BarChart3,
    ocid: "nav.results_link",
  },
  {
    to: "/brief",
    label: "Daily Brief",
    icon: FileText,
    ocid: "nav.brief_link",
  },
] as const;

const ADMIN_ITEM = {
  to: "/admin",
  label: "Admin Panel",
  icon: Settings2,
  ocid: "nav.admin_link",
};

export function Sidebar() {
  const routerState = useRouterState();
  const { data: clientInfo } = useClientInfo();
  const pathname = routerState.location.pathname;

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center glow-accent">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold font-display text-foreground tracking-tight">
            AIOS
          </p>
          <p className="text-[10px] text-muted-foreground leading-none">
            AI Operating System
          </p>
        </div>
      </div>

      {/* Client info */}
      {clientInfo && (
        <div className="px-4 py-3 border-b border-sidebar-border/60">
          <p className="text-xs text-muted-foreground mb-0.5">Client</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground truncate min-w-0">
              {clientInfo.clientName}
            </p>
            <SystemStatusBadge status={clientInfo.systemStatus} />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3 pb-2 pt-1">
          Navigation
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              data-ocid={ocid}
              className={isActive ? "nav-link-active" : "nav-link"}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}

        <Separator className="my-3 bg-sidebar-border/60" />

        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3 pb-2 pt-1">
          Management
        </p>
        <Link
          to={ADMIN_ITEM.to}
          data-ocid={ADMIN_ITEM.ocid}
          className={
            pathname.startsWith(ADMIN_ITEM.to) ? "nav-link-active" : "nav-link"
          }
        >
          <ADMIN_ITEM.icon className="w-4 h-4 shrink-0" />
          {ADMIN_ITEM.label}
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border/60">
        <p className="text-[10px] text-muted-foreground/50 leading-relaxed">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-colors duration-200"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}
