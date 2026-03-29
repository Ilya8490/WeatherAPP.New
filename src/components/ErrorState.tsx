import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <section className="panel flex items-start gap-4 px-5 py-5 sm:px-6">
      <div className="rounded-2xl bg-red-500/10 p-3 text-red-500 dark:text-red-300">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm muted">{description}</p>
      </div>
    </section>
  );
}
