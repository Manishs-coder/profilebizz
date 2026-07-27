import * as React from "react"
import { AdminLayout } from "../components/layout/AdminLayout"
import { Database, Download, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "../components/ui"

interface BackupEntry {
  name: string
  size: number
  createdAt: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(iso: string): string {
  if (!iso) return "—"
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso))
}

const API_BASE = ""

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    credentials: "include",
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `HTTP ${res.status}`)
  }
  return res
}

export default function BackupPage() {
  const [backups, setBackups] = React.useState<BackupEntry[]>([])
  const [loading, setLoading] = React.useState(true)
  const [triggering, setTriggering] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  const fetchList = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiFetch("/backup/list")
      setBackups(await res.json())
    } catch (e: any) {
      setError(e.message ?? "Failed to load backups")
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { fetchList() }, [fetchList])

  const handleTrigger = async () => {
    setTriggering(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await apiFetch("/backup/trigger", { method: "POST" })
      const { filename } = await res.json()
      setSuccess(`Backup created: ${filename}`)
      await fetchList()
    } catch (e: any) {
      setError(e.message ?? "Backup failed")
    } finally {
      setTriggering(false)
    }
  }

  const handleDownload = (filename: string) => {
    window.open(`${API_BASE}/api/backup/download/${encodeURIComponent(filename)}`, "_blank")
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Database Backup
            </h1>
            <p className="text-slate-500 mt-1">
              Cloudflare par manual JSON backup banayein. Last 7 backups stored rehte hain.
            </p>
          </div>
          <Button
            onClick={handleTrigger}
            disabled={triggering}
            className="flex items-center gap-2"
          >
            {triggering ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {triggering ? "Backup ban raha hai…" : "Abhi Backup Lo"}
          </Button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            {success}
          </div>
        )}

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Backups</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{backups.length}</p>
            <p className="text-xs text-slate-400 mt-1">of 7 max</p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Backup</p>
            <p className="text-sm font-semibold text-slate-700 mt-2">
              {backups[0] ? formatDate(backups[0].createdAt) : "—"}
            </p>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Schedule</p>
            <p className="text-sm font-semibold text-slate-700 mt-2">On demand</p>
            <p className="text-xs text-slate-400 mt-1">Manual backup</p>
          </div>
        </div>

        {/* Backup list */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b flex items-center justify-between">
            <h2 className="font-bold font-serif text-slate-800">Stored Backups</h2>
            <button
              onClick={fetchList}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Refresh list"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-3" />
              Load ho raha hai…
            </div>
          ) : backups.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              <Database className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p>Koi backup nahi mila.</p>
              <p className="mt-1">Upar "Abhi Backup Lo" button dabao.</p>
            </div>
          ) : (
            <ul className="divide-y">
              {backups.map((b, i) => (
                <li
                  key={b.name}
                  className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${i === 0 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 font-mono">{b.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatDate(b.createdAt)} · {formatSize(b.size)}
                        {i === 0 && (
                          <span className="ml-2 text-green-600 font-semibold">● Latest</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(b.name)}
                    className="flex items-center gap-1.5 shrink-0 ml-4"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Info note */}
        <div className="text-xs text-slate-400 bg-slate-50 border rounded-lg p-4 leading-relaxed">
          <strong className="text-slate-600">Restore kaise karein:</strong>{" "}
          Download ki hui JSON file ko safe rakhein. Zarurat par ise Cloudflare database mein restore kiya ja sakta hai.
        </div>
      </div>
    </AdminLayout>
  )
}
