import type { PropsWithChildren } from "react";

export function WeatherShell({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {children}
    </main>
  );
}
