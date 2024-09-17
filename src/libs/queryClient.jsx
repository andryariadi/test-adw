"use client";

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }) => <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;

export default QueryClientProvider;
