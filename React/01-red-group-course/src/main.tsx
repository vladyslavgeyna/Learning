import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/global.scss'
import AuthProvider from "./providers/AuthProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Router from "./components/Router";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <Router />
          </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>
)
