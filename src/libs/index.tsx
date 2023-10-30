"use client";

import DefaultLayout from "@/layout";
import StyledComponentsRegistry from "./AntdRegistry";
import QueryClientProviders from "./ReactQueryRegistry";
import ReduxToolkitProviders from "./ReduxToolkitRegistry";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxToolkitProviders>
      <StyledComponentsRegistry>
        <QueryClientProviders>
          <DefaultLayout>{children}</DefaultLayout>
        </QueryClientProviders>
      </StyledComponentsRegistry>
    </ReduxToolkitProviders>
  );
}
