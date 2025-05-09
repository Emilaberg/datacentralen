import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Routing/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AlgorithmProvider from "./Services/AlgorithmProvider";

const queryClient = new QueryClient();

// providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlgorithmProvider>
        <Router />
      </AlgorithmProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
