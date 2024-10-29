import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <main className="max-w-lg mx-auto flex flex-col py-6">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}
