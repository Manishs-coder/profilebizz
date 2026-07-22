import * as React from "react"
import { useGetDashboardStats, useListFounders } from "@workspace/api-client-react"
import { AdminLayout } from "../components/layout/AdminLayout"
import { Users, FileText, CheckCircle2, Clock, Globe } from "lucide-react"
import { Link } from "wouter"

export default function Dashboard() {
  const { data: stats, isLoading } = useGetDashboardStats()
  const { data: founders } = useListFounders()

  const recentFounders = React.useMemo(() => {
    if (!founders) return []
    return [...founders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
  }, [founders])

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 w-1/4 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  const statCards = [
    {
      title: "Total Profiles",
      value: stats?.totalFounders || 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Published",
      value: stats?.publishedFounders || 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Drafts",
      value: stats?.draftFounders || 0,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    }
  ]

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Desk Overview</h1>
          <p className="text-slate-500 mt-1">Here's what's happening in the editorial room today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl border shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border shadow-sm p-6 lg:col-span-1">
            <h2 className="text-lg font-bold font-serif mb-6 text-slate-800">Category Breakdown</h2>
            <div className="space-y-5">
              {stats?.categories && stats.categories.length > 0 ? (
                stats.categories.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 truncate mr-2">{cat.name || 'Uncategorized'}</span>
                    <div className="flex items-center gap-3 w-1/2 justify-end">
                      <div className="h-2 flex-1 max-w-[80px] bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(cat.count / (stats.totalFounders || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-500 font-medium w-6 text-right">{cat.count}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No categories data yet.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border shadow-sm overflow-hidden lg:col-span-2 flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold font-serif text-slate-800">Recently Updated</h2>
              <Link href="/founders" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="flex-1">
              {recentFounders.length > 0 ? (
                <ul className="divide-y">
                  {recentFounders.map(founder => (
                    <li key={founder.id} className="hover:bg-slate-50 transition-colors">
                      <Link href={`/founders/${founder.slug}/edit`} className="flex items-center justify-between p-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 border overflow-hidden flex items-center justify-center shrink-0">
                            {founder.photoUrl ? (
                              <img src={founder.photoUrl} alt={founder.name} className="h-full w-full object-cover" />
                            ) : (
                              <Users className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 group-hover:text-primary transition-colors">{founder.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{founder.designation} • {founder.category || "Uncategorized"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {founder.published ? (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">
                              <Globe className="h-3 w-3" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-1 rounded">
                              <FileText className="h-3 w-3" /> Draft
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <p>No profiles found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
