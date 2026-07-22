import * as React from "react"
import { Switch, Route, Router } from "wouter"
import { AdminLayout } from "./components/layout/AdminLayout"
import { AuthGuard } from "./components/auth/AuthGuard"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import FoundersList from "./pages/founders/index"
import FounderEdit from "./pages/founders/edit"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function AppRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <AuthGuard><Dashboard /></AuthGuard>
      </Route>
      <Route path="/founders">
        <AuthGuard><FoundersList /></AuthGuard>
      </Route>
      <Route path="/founders/new">
        <AuthGuard><FounderEdit /></AuthGuard>
      </Route>
      <Route path="/founders/:slug/edit">
        <AuthGuard><FounderEdit /></AuthGuard>
      </Route>
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif">404</h1>
            <p className="text-slate-500 mt-2">Page not found</p>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  )
}
