import * as React from "react"
import {
  useListCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  getListCategoriesQueryKey,
} from "@workspace/api-client-react"
import { AdminLayout } from "../../components/layout/AdminLayout"
import { Button, Input, Label } from "../../components/ui"
import { Plus, Pencil, Trash2, Tag, X, ChevronDown, ChevronRight, Loader2 } from "lucide-react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { useToast } from "../../hooks/use-toast"

/* ─── Types ─── */
type CategoryRow = { id: number; name: string; slug: string; description: string | null; color: string | null; sortOrder: number; createdAt: string }
type SubCatRow   = { id: number; categoryId: number; name: string; slug: string; description: string | null; sortOrder: number; createdAt: string }
type FormState   = { name: string; description: string; color: string; sortOrder: number }
type SubForm     = { name: string; description: string; sortOrder: number }

const PRESET_COLORS = ["#EF4444","#F97316","#EAB308","#22C55E","#3B82F6","#8B5CF6","#EC4899","#6B7280","#14B8A6","#F59E0B","#10B981","#6366F1"]
const emptyCatForm: FormState = { name: "", description: "", color: "#6B7280", sortOrder: 0 }
const emptySubForm: SubForm   = { name: "", description: "", sortOrder: 0 }

/* ─── Sub-category API hooks ─── */
function useSubCategories(categoryId: number | null) {
  return useQuery<SubCatRow[]>({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      if (!categoryId) return []
      const res = await fetch(`/api/categories/${categoryId}/subcategories`, { credentials: "include" })
      if (!res.ok) throw new Error("Failed to load sub-categories")
      return res.json()
    },
    enabled: categoryId !== null,
  })
}

function useCreateSubCategory(categoryId: number, onSuccess: () => void) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (body: SubForm) => {
      const res = await fetch(`/api/categories/${categoryId}/subcategories`, {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify(body),
      })
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || "Failed") }
      return res.json()
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["subcategories", categoryId] }); onSuccess() },
  })
}

function useDeleteSubCategory(categoryId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/subcategories/${id}`, { method: "DELETE", credentials: "include" })
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subcategories", categoryId] }),
  })
}

function useUpdateSubCategory(categoryId: number, onSuccess: () => void) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, body }: { id: number; body: SubForm }) => {
      const res = await fetch(`/api/subcategories/${id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify(body),
      })
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || "Failed") }
      return res.json()
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["subcategories", categoryId] }); onSuccess() },
  })
}

/* ─── Sub-categories panel ─── */
function SubCategoriesPanel({ category }: { category: CategoryRow }) {
  const { data: subs = [], isLoading } = useSubCategories(category.id)
  const [showAdd, setShowAdd] = React.useState(false)
  const [editId, setEditId] = React.useState<number | null>(null)
  const [form, setForm] = React.useState<SubForm>(emptySubForm)
  const { toast } = useToast()

  const createMut = useCreateSubCategory(category.id, () => { setShowAdd(false); setForm(emptySubForm) })
  const updateMut = useUpdateSubCategory(category.id, () => { setEditId(null); setForm(emptySubForm) })
  const deleteMut = useDeleteSubCategory(category.id)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editId !== null) {
      updateMut.mutate({ id: editId, body: form }, { onError: err => toast({ title: "Error", description: err.message, variant: "destructive" }) })
    } else {
      createMut.mutate(form, { onError: err => toast({ title: "Error", description: err.message, variant: "destructive" }) })
    }
  }

  return (
    <div className="ml-6 mt-2 border-l-2 pl-4" style={{ borderColor: category.color ?? "#6B7280" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Sub-categories</span>
        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => { setShowAdd(true); setEditId(null); setForm(emptySubForm) }}>
          <Plus className="h-3 w-3" /> Add Sub-category
        </Button>
      </div>

      {isLoading && <p className="text-xs text-slate-400 py-1">Loading…</p>}

      <div className="space-y-1">
        {subs.map(sub => (
          <div key={sub.id}>
            {editId === sub.id ? (
              <form onSubmit={handleSave} className="flex items-center gap-2 py-1">
                <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="h-7 text-xs flex-1" placeholder="Sub-category name" autoFocus />
                <Button type="submit" size="sm" className="h-7 text-xs" disabled={updateMut.isPending}>
                  {updateMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setEditId(null)}>Cancel</Button>
              </form>
            ) : (
              <div className="flex items-center justify-between group rounded px-2 py-1.5 hover:bg-slate-50">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm text-slate-700 font-medium truncate">{sub.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{sub.slug}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400"
                    onClick={() => { setEditId(sub.id); setForm({ name: sub.name, description: sub.description ?? "", sortOrder: sub.sortOrder }) }}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                    onClick={() => deleteMut.mutate(sub.id)} disabled={deleteMut.isPending}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {subs.length === 0 && !isLoading && !showAdd && (
          <p className="text-xs text-slate-400 py-1 italic">No sub-categories yet</p>
        )}

        {showAdd && (
          <form onSubmit={handleSave} className="flex items-center gap-2 py-1">
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="h-7 text-xs flex-1" placeholder="New sub-category name" autoFocus />
            <Button type="submit" size="sm" className="h-7 text-xs" disabled={createMut.isPending}>
              {createMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Add"}
            </Button>
            <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setShowAdd(false)}>Cancel</Button>
          </form>
        )}
      </div>
    </div>
  )
}

/* ─── Delete modal ─── */
function DeleteModal({ category, onConfirm, onCancel, isPending }: { category: CategoryRow; onConfirm: () => void; onCancel: () => void; isPending: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Delete Category</h3>
            <p className="text-sm text-slate-500">This will also delete all its sub-categories.</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 mb-6">Are you sure you want to delete <span className="font-semibold">"{category.name}"</span>?</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
          <Button onClick={onConfirm} disabled={isPending} className="bg-red-600 hover:bg-red-700 text-white gap-2">
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Category form ─── */
function CategoryForm({ initial, onSave, onCancel, isPending }: { initial: FormState; onSave: (f: FormState) => void; onCancel: () => void; isPending: boolean }) {
  const [form, setForm] = React.useState<FormState>(initial)
  return (
    <div className="bg-slate-50 border rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category Name *</Label>
          <Input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Startup Founder" />
        </div>
        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Input type="number" value={form.sortOrder} onChange={e => setForm(p => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))} placeholder="0" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional description" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Color</Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_COLORS.map(c => (
              <button key={c} type="button" onClick={() => setForm(p => ({ ...p, color: c }))}
                className={`w-7 h-7 rounded-full border-2 transition-all ${form.color === c ? "border-slate-800 scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }} />
            ))}
            <div className="flex items-center gap-2 mt-1">
              <div className="w-5 h-5 rounded-full border" style={{ backgroundColor: form.color }} />
              <Input value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} className="w-28 h-8 text-xs font-mono" placeholder="#000000" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end pt-2">
        <Button variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={isPending || !form.name.trim()} className="gap-2">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null} Save Category
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Page ─── */
export default function CategoriesPage() {
  const { data: categories = [], isLoading } = useListCategories()
  const createMut = useCreateCategory()
  const updateMut = useUpdateCategory()
  const deleteMut = useDeleteCategory()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [showAddForm, setShowAddForm] = React.useState(false)
  const [editingId, setEditingId]     = React.useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<CategoryRow | null>(null)
  const [expandedId, setExpandedId]   = React.useState<number | null>(null)

  const handleCreate = (form: FormState) => {
    createMut.mutate(form as any, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() }); setShowAddForm(false); toast({ title: "Category created" }) },
      onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
    })
  }

  const handleUpdate = (id: number, form: FormState) => {
    updateMut.mutate({ id, data: form as any }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() }); setEditingId(null); toast({ title: "Category updated" }) },
      onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteMut.mutate({ id: deleteTarget.id }, {
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() }); setDeleteTarget(null); toast({ title: "Deleted" }) },
      onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
    })
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Categories</h1>
              <p className="text-sm text-slate-500">{(categories as CategoryRow[]).length} categories · Expand to manage sub-categories</p>
            </div>
          </div>
          <Button onClick={() => { setShowAddForm(true); setEditingId(null) }} className="gap-2" disabled={showAddForm}>
            <Plus className="h-4 w-4" /> New Category
          </Button>
        </div>

        {/* Add form */}
        {showAddForm && (
          <CategoryForm initial={emptyCatForm} onSave={handleCreate} onCancel={() => setShowAddForm(false)} isPending={createMut.isPending} />
        )}

        {/* List */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          {isLoading && (
            <div className="flex items-center justify-center py-12 gap-2 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading categories…
            </div>
          )}
          {!isLoading && (categories as CategoryRow[]).length === 0 && (
            <div className="py-16 text-center">
              <Tag className="h-10 w-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No categories yet</p>
              <p className="text-sm text-slate-400 mt-1">Create your first category above</p>
            </div>
          )}
          <ul className="divide-y divide-slate-100">
            {(categories as CategoryRow[]).map(cat => (
              <li key={cat.id}>
                {editingId === cat.id ? (
                  <div className="p-4">
                    <CategoryForm
                      initial={{ name: cat.name, description: cat.description ?? "", color: cat.color ?? "#6B7280", sortOrder: cat.sortOrder }}
                      onSave={form => handleUpdate(cat.id, form)}
                      onCancel={() => setEditingId(null)}
                      isPending={updateMut.isPending}
                    />
                  </div>
                ) : (
                  <div>
                    {/* Category row */}
                    <div className="flex items-center gap-3 px-4 py-3 group hover:bg-slate-50 transition-colors">
                      {/* Expand toggle */}
                      <button
                        onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)}
                        className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                        title="Toggle sub-categories"
                      >
                        {expandedId === cat.id
                          ? <ChevronDown className="h-4 w-4" />
                          : <ChevronRight className="h-4 w-4" />}
                      </button>
                      {/* Color dot */}
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color ?? "#6B7280" }} />
                      {/* Name + slug */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{cat.name}</span>
                          <span className="text-xs text-slate-400 font-mono">{cat.slug}</span>
                        </div>
                        {cat.description && <p className="text-sm text-slate-500 truncate">{cat.description}</p>}
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-500"
                          onClick={() => { setEditingId(cat.id); setShowAddForm(false) }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteTarget(cat as CategoryRow)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Sub-categories panel */}
                    {expandedId === cat.id && (
                      <div className="px-4 pb-4">
                        <SubCategoriesPanel category={cat as CategoryRow} />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal category={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} isPending={deleteMut.isPending} />
      )}
    </AdminLayout>
  )
}
