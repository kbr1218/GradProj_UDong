import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "../src/styles/GlobalStyle";
import theme from "../src/styles/theme";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();
queryClient.defaultQueryOptions({
    refetchOnWindowFocus: false,
});

if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(
        container,
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <GlobalStyle theme={theme} />
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </RecoilRoot>
        </>
    );
} else {
    root.render(
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <GlobalStyle theme={theme} />
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </RecoilRoot>
        </>
    );
}
