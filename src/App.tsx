import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./Routing/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AlgorithmProvider from "./Services/AlgorithmProvider";
import SaveToLocalStorageProvider from "./Services/SaveToLocalStorageProvider";


const queryClient = new QueryClient();

// providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlgorithmProvider>
        <SaveToLocalStorageProvider>
          <Router />
        </SaveToLocalStorageProvider>
      </AlgorithmProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
