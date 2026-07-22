import * as React from "react"
import { useLocation } from "wouter"
import { useGetMe } from "@workspace/api-client-react"
import { Loader2 } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation()
  
  const { data: user, isLoading, error } = useGetMe({
    query: {
      retry: false,
      queryKey: ["/api/auth/me"]
    }
  })

  React.useEffect(() => {
    if (!isLoading && error) {
      setLocation("/login")
    }
  }, [isLoading, error, setLocation])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !user) {
    return null
  }

  return <>{children}</>
}
