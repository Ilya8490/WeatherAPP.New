export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-[rgb(var(--bg-soft))] ${className ?? ""}`} />;
}
