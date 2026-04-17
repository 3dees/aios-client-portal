import { Layout } from "@/components/Layout";
import { PageLoading } from "@/components/ui/LoadingSpinner";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const AgentsPage = lazy(() => import("@/pages/Agents"));
const LayersPage = lazy(() => import("@/pages/Layers"));
const ResultsPage = lazy(() => import("@/pages/Results"));
const BriefPage = lazy(() => import("@/pages/DailyBrief"));
const AdminPage = lazy(() => import("@/pages/Admin"));

// ── Routes ────────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: Layout });

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <DashboardPage />
    </Suspense>
  ),
});

const agentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agents",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <AgentsPage />
    </Suspense>
  ),
});

const layersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/layers",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <LayersPage />
    </Suspense>
  ),
});

const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/results",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <ResultsPage />
    </Suspense>
  ),
});

const briefRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/brief",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <BriefPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoading />}>
      <AdminPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  agentsRoute,
  layersRoute,
  resultsRoute,
  briefRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="dark">
      <RouterProvider router={router} />
    </div>
  );
}
