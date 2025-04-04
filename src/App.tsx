import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './Routing/Router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();



// providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App
