import * as React from "react"
import { useLocation } from "wouter"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "@workspace/api-client-react"
import { Button, Input, Label } from "../components/ui"
import { Loader2, FileText } from "lucide-react"

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const [, setLocation] = useLocation()
  const loginMutation = useLogin()
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({ data }, {
      onSuccess: () => {
        setLocation("/")
      },
      onError: (err) => {
        // We'll show standard error if api fails
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative z-10">
        <div className="text-center mb-10">
          <div className="mx-auto h-12 w-12 bg-primary text-primary-foreground flex items-center justify-center rounded-lg shadow-sm mb-6">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">ProfileBizz.</h2>
          <p className="mt-2 text-sm text-slate-500 font-medium">Editorial Administration Panel</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {loginMutation.error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md">
              Invalid credentials. Please try again.
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-700">Username</Label>
            <Input 
              id="username" 
              {...form.register("username")} 
              className="h-11 focus-visible:ring-primary/20"
              placeholder="editor"
              autoComplete="username"
            />
            {form.formState.errors.username && (
              <p className="text-xs text-red-500">{form.formState.errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input 
              id="password" 
              type="password" 
              {...form.register("password")} 
              className="h-11 focus-visible:ring-primary/20"
              autoComplete="current-password"
            />
            {form.formState.errors.password && (
              <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base shadow-sm font-semibold"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Sign In to Desk"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
