"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as ReduxProvider } from "react-redux";
import { ReactNode } from "react";
import { queryClient } from "@/lib/react-query";
import { store } from "@/store";
import { Toaster } from "sonner";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" richColors closeButton duration={5000} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
