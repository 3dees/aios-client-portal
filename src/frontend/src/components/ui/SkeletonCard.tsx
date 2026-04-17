import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="agent-card space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/5" />
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="stat-card space-y-3">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-9 w-24" />
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function SkeletonLayerRow() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="h-3 w-24 shrink-0" />
      <Skeleton className="h-2 flex-1 rounded-full" />
      <Skeleton className="h-3 w-10" />
    </div>
  );
}

export function SkeletonBrief() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-20 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}
