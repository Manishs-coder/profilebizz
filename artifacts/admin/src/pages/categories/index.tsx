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
import { Plus, Pencil, Trash2, Tag, X, Check, Loader2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../hooks/use-toast"

const PRESET_COLORS = [
  "#EF4444", "#F97316", "#EAB308", "#22C55E",
  "#3B82F6", "#8B5CF6", "#EC4899", "#6B7280",
  "#14B8A6", "#F59E0B", "#10B981", "#6366F1",
]

type CategoryRow = {
  id: number
  name: string
  slug: string
  description: string | null
  color: string | null
  sortOrder: number
  createdAt: string
}

type FormState = {
  name: string
  description: string
  color: string
  sortOrder: number
}

const emptyForm: FormState = { name: "", description: "", color: "#6B7280", sortOrder: 0 }

function DeleteModal({ category, onConfirm, onCancel, isPending }: {
  category: CategoryRow
  onConfirm: () => void
  onCancel: () => void
  isPending: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onCancel} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
            <Trash2 className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Delete Category</h3>
            <p className="text-sm text-slate-500">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 mb-6">
          Are you sure you want to delete <span className="font-semibold">"{category.name}"</span>? Founders assigned this category will become uncategorized.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white gap-2"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

function CategoryForm({ initial, onSave, onCancel, isPending }: {
  initial: FormState
  onSave: (form: FormState) => void
  onCancel: () => void
  isPending: boolean
}) {
  const [form, setForm] = React.useState<FormState>(initial)

  return (
    <div className="bg-slate-50 border rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category Name *</Label>
          <Input
            required
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Startup Founder"
          />
        </div>
        <div className="space-y-2">
          <Label>Sort Order</Label>
          <Input
            type="number"
            value={form.sortOrder}
            onChange={e => setForm(p => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
            placeholder="0"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Input
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            placeholder="Short description of this category"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Color</Label>
          <div className="flex flex-wrap gap-2 items-center">
            {PRESET_COLORS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setForm(p => ({ ...p, color: c }))}
                className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${form.color === c ? "border-slate-900 scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <div className="flex items-center gap-2 ml-2">
              <input
                type="color"
                value={form.color}
                onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                className="h-7 w-7 rounded cursor-pointer border"
              />
              <span className="text-xs text-slate-500 font-mono">{form.color}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 pt-2 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
        <Button
          onClick={() => { if (form.name.trim()) onSave(form) }}
          disabled={isPending || !form.name.trim()}
          className="gap-2"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save Category
        </Button>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const { data: categories, isLoading } = useListCategories()
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  const deleteMutation = useDeleteCategory()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const [showAddForm, setShowAddForm] = React.useState(false)
  const [editingId, setEditingId] = React.useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<CategoryRow | null>(null)

  const invalidate = () => queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() })

  const handleCreate = (form: FormState) => {
    createMutation.mutate({ data: { name: form.name, description: form.description || undefined, color: form.color, sortOrder: form.sortOrder } }, {
      onSuccess: () => {
        invalidate()
        setShowAddForm(false)
        toast({ title: "Category created", description: `"${form.name}" has been added.` })
      },
      onError: () => toast({ title: "Error", description: "Failed to create category.", variant: "destructive" }),
    })
  }

  const handleUpdate = (id: number, form: FormState) => {
    updateMutation.mutate({ id, data: { name: form.name, description: form.description || undefined, color: form.color, sortOrder: form.sortOrder } }, {
      onSuccess: () => {
        invalidate()
        setEditingId(null)
        toast({ title: "Category updated" })
      },
      onError: () => toast({ title: "Error", description: "Failed to update category.", variant: "destructive" }),
    })
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteMutation.mutate({ id: deleteTarget.id }, {
      onSuccess: () => {
        invalidate()
        setDeleteTarget(null)
        toast({ title: "Category deleted", description: `"${deleteTarget.name}" has been removed.` })
      },
      onError: () => toast({ title: "Error", description: "Failed to delete category.", variant: "destructive" }),
    })
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Categories</h1>
            <p className="text-slate-500 mt-1">Manage profile categories and tags for editorial classification.</p>
          </div>
          <Button
            onClick={() => { setShowAddForm(true); setEditingId(null) }}
            className="w-full sm:w-auto gap-2 shadow-sm"
            disabled={showAddForm}
          >
            <Plus className="h-4 w-4" /> New Category
          </Button>
        </div>

        {showAddForm && (
          <CategoryForm
            initial={emptyForm}
            onSave={handleCreate}
            onCancel={() => setShowAddForm(false)}
            isPending={createMutation.isPending}
          />
        )}

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin text-slate-300 mx-auto mb-3" />
              Loading categories...
            </div>
          ) : !categories || categories.length === 0 ? (
            <div className="p-12 text-center">
              <Tag className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="font-medium text-slate-700">No categories yet</p>
              <p className="text-sm text-slate-500 mt-1">Click "New Category" to get started.</p>
            </div>
          ) : (
            <ul className="divide-y">
              {categories.map(cat => {
                const isEditing = editingId === cat.id
                return (
                  <li key={cat.id} className="p-4 px-6">
                    {isEditing ? (
                      <CategoryForm
                        initial={{ name: cat.name, description: cat.description || "", color: cat.color || "#6B7280", sortOrder: cat.sortOrder }}
                        onSave={(form) => handleUpdate(cat.id, form)}
                        onCancel={() => setEditingId(null)}
                        isPending={updateMutation.isPending}
                      />
                    ) : (
                      <div className="flex items-center gap-4 group">
                        <div className="h-9 w-9 rounded-full shrink-0 border-2" style={{ backgroundColor: cat.color || "#6B7280" }} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{cat.name}</span>
                            <span className="text-xs text-slate-400 font-mono">{cat.slug}</span>
                          </div>
                          {cat.description && (
                            <p className="text-sm text-slate-500 truncate mt-0.5">{cat.description}</p>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 hidden sm:block">
                          Order: {cat.sortOrder}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-500"
                            onClick={() => { setEditingId(cat.id); setShowAddForm(false) }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setDeleteTarget(cat as CategoryRow)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          category={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isPending={deleteMutation.isPending}
        />
      )}
    </AdminLayout>
  )
}
