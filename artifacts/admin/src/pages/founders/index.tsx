import * as React from "react"
import { Link } from "wouter"
import { useListFounders, useDeleteFounder, getListFoundersQueryKey } from "@workspace/api-client-react"
import { AdminLayout } from "../../components/layout/AdminLayout"
import { Button, Input } from "../../components/ui"
import { Plus, Search, MoreVertical, Edit, Trash2, Globe, FileEdit, Users } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

export default function FoundersList() {
  const { data: founders, isLoading } = useListFounders()
  const deleteMutation = useDeleteFounder()
  const queryClient = useQueryClient()
  const [search, setSearch] = React.useState("")

  const filteredFounders = React.useMemo(() => {
    if (!founders) return []
    return founders.filter(f => 
      f.name.toLowerCase().includes(search.toLowerCase()) || 
      (f.designation && f.designation.toLowerCase().includes(search.toLowerCase())) ||
      (f.category && f.category.toLowerCase().includes(search.toLowerCase()))
    )
  }, [founders, search])

  const handleDelete = (slug: string) => {
    if (window.confirm("Are you sure you want to delete this profile? This cannot be undone.")) {
      deleteMutation.mutate({ slug }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListFoundersQueryKey() })
        }
      })
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Founders</h1>
            <p className="text-slate-500 mt-1">Manage biography profiles and editorial content.</p>
          </div>
          <Link href="/founders/new" className="block w-full sm:w-auto">
            <Button className="w-full sm:w-auto font-medium shadow-sm gap-2">
              <Plus className="h-4 w-4" />
              New Profile
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-4 border-b bg-slate-50/50 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search profiles..." 
                className="pl-9 bg-white"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold">Profile</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date Added</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Loading profiles...
                    </td>
                  </tr>
                ) : filteredFounders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <FileEdit className="h-10 w-10 text-slate-300 mb-3" />
                        <p className="font-medium text-slate-700">No profiles found</p>
                        <p className="text-sm mt-1">Try adjusting your search or add a new profile.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFounders.map(founder => (
                    <tr key={founder.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border">
                            {founder.photoUrl ? (
                              <img src={founder.photoUrl} alt={founder.name} className="h-full w-full object-cover" />
                            ) : (
                              <Users className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 group-hover:text-primary transition-colors">
                              {founder.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate max-w-[200px]">
                              {founder.designation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {founder.category || "Uncategorized"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {founder.published ? (
                          <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
                            <Globe className="h-3.5 w-3.5" /> Published
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-600 text-xs font-medium">
                            <FileEdit className="h-3.5 w-3.5" /> Draft
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(founder.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/founders/${founder.slug}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600">
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDelete(founder.slug)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
