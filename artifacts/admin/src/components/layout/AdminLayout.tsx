import * as React from "react"
import { Sidebar } from "./Sidebar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
