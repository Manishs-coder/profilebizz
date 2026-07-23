import * as React from "react"
import { useParams, useLocation, Link } from "wouter"
import {
  useGetFounder,
  useCreateFounder,
  useUpdateFounder,
  useGetFounderSections,
  useUpdateFounderSections,
  useGetFounderSeo,
  useUpdateFounderSeo,
  useListCategories,
  getGetFounderQueryKey,
  getGetFounderSectionsQueryKey,
  getGetFounderSeoQueryKey,
} from "@workspace/api-client-react"
import { AdminLayout } from "../../components/layout/AdminLayout"
import { Button, Input, Textarea, Label, Select } from "../../components/ui"
import { Loader2, ArrowLeft, Image as ImageIcon, Save, Plus, Trash2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../hooks/use-toast"

export default function FounderEdit() {
  const params = useParams()
  const [location, setLocation] = useLocation()
  const { toast } = useToast()

  const searchString = typeof window !== "undefined" ? window.location.search : ""
  const searchParams = new URLSearchParams(searchString)

  const isNew = !params.id && !params.slug && location.endsWith("/new")
  const slug = (params.slug as string) || ""

  const [activeTab, setActiveTab] = React.useState(searchParams.get("tab") || "basic")

  const queryClient = useQueryClient()

  const { data: founder, isLoading: isLoadingFounder } = useGetFounder(slug, {
    query: { enabled: !isNew && !!slug, queryKey: getGetFounderQueryKey(slug) },
  })

  const { data: categories } = useListCategories()

  const [basicInfo, setBasicInfo] = React.useState({
    name: "",
    designation: "",
    profileType: "",
    profileTag: "",
    category: "",
    location: "",
    founded: "",
    revenue: "",
    employees: "",
    age: "",
    photoUrl: "",
    coverPhotoUrl: "",
    oneLiner: "",
    executiveSummary: "",
    published: false,
  })

  React.useEffect(() => {
    if (founder) {
      setBasicInfo({
        name: founder.name || "",
        designation: founder.designation || "",
        profileType: founder.profileType || "",
        profileTag: founder.profileTag || "",
        category: founder.category || "",
        location: founder.location || "",
        founded: founder.founded || "",
        revenue: founder.revenue || "",
        employees: founder.employees || "",
        age: founder.age || "",
        photoUrl: founder.photoUrl || "",
        coverPhotoUrl: founder.coverPhotoUrl || "",
        oneLiner: founder.oneLiner || "",
        executiveSummary: founder.executiveSummary || "",
        published: founder.published || false,
      })
    }
  }, [founder])

  const createMutation = useCreateFounder()
  const updateMutation = useUpdateFounder()

  const handleBasicInfoSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (isNew) {
      createMutation.mutate(
        { data: basicInfo as any },
        {
          onSuccess: (newFounder) => {
            toast({ title: "Profile created!", description: `${newFounder.name} has been saved as draft.` })
            setLocation(`/founders/${newFounder.slug}/edit`)
          },
          onError: () => toast({ title: "Error", description: "Failed to create profile.", variant: "destructive" }),
        }
      )
    } else {
      updateMutation.mutate(
        { slug, data: basicInfo as any },
        {
          onSuccess: (updated) => {
            queryClient.setQueryData(getGetFounderQueryKey(slug), updated)
            toast({ title: "Saved!", description: "Basic info has been updated." })
          },
          onError: () => toast({ title: "Error", description: "Failed to save.", variant: "destructive" }),
        }
      )
    }
  }

  const handlePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photoUrl" | "coverPhotoUrl"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    try {
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })
      const { url } = await res.json()
      setBasicInfo((prev) => ({ ...prev, [field]: url }))
      toast({ title: "Photo uploaded" })
    } catch (err) {
      toast({ title: "Upload failed", description: "Could not upload photo.", variant: "destructive" })
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto pb-20">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/founders">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              {isNew ? "New Profile" : `Edit ${founder?.name || "Profile"}`}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {!isNew && (
              <span
                className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                  basicInfo.published
                    ? "bg-green-50 text-green-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {basicInfo.published ? "Published" : "Draft"}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {["basic", "sections", "seo"].map((tab) => {
              const label = tab === "basic" ? "Basic Info" : tab === "sections" ? "Story Sections" : "SEO Meta"
              const disabled = isNew && tab !== "basic"
              return (
                <button
                  key={tab}
                  onClick={() => !disabled && setActiveTab(tab)}
                  disabled={disabled}
                  className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className="p-6 md:p-8">
            {isLoadingFounder && !isNew ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
              </div>
            ) : (
              <>
                {activeTab === "basic" && (
                  <form onSubmit={handleBasicInfoSave} className="space-y-8">
                    {/* Publish toggle */}
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
                      <div className="space-y-0.5">
                        <Label className="text-base font-semibold">Publish Status</Label>
                        <p className="text-sm text-slate-500">Make this profile visible to the public.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={basicInfo.published}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, published: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Name + Designation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          required
                          value={basicInfo.name}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Designation *</Label>
                        <Input
                          required
                          value={basicInfo.designation}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, designation: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Category + meta fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={basicInfo.category}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="">Select Category</option>
                          {categories && categories.length > 0
                            ? categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))
                            : [
                                "Startup Founder",
                                "Women Founder",
                                "D2C Pioneer",
                                "Rural Founder",
                                "Corporate Leader",
                                "Social Entrepreneur",
                                "Tech Builder",
                                "Legacy Builder",
                              ].map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={basicInfo.location}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Founded Year</Label>
                        <Input
                          value={basicInfo.founded}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, founded: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Revenue</Label>
                        <Input
                          value={basicInfo.revenue}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, revenue: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Employees</Label>
                        <Input
                          value={basicInfo.employees}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, employees: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          value={basicInfo.age}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, age: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Type</Label>
                        <Input
                          value={basicInfo.profileType}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, profileType: e.target.value }))}
                          placeholder="e.g. Zero to One"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Tag</Label>
                        <Input
                          value={basicInfo.profileTag}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, profileTag: e.target.value }))}
                          placeholder="e.g. Bharat Builder"
                        />
                      </div>
                    </div>

                    {/* One-liner + summary */}
                    <div className="space-y-6 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>One-Liner Tagline</Label>
                        <Input
                          value={basicInfo.oneLiner}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, oneLiner: e.target.value }))}
                          placeholder="A short punchy summary of the founder..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Executive Summary</Label>
                        <Textarea
                          value={basicInfo.executiveSummary}
                          onChange={(e) => setBasicInfo((prev) => ({ ...prev, executiveSummary: e.target.value }))}
                          className="min-h-[120px]"
                          placeholder="2-3 paragraph intro shown on the homepage card..."
                        />
                      </div>
                    </div>

                    {/* Photos */}
                    <div className="space-y-6 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label>Profile Photo</Label>
                          <div className="flex items-start gap-4">
                            <div className="h-24 w-24 shrink-0 rounded-full border-2 border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                              {basicInfo.photoUrl ? (
                                <img src={basicInfo.photoUrl} alt="Preview" className="h-full w-full object-cover" />
                              ) : (
                                <ImageIcon className="h-8 w-8 text-slate-300" />
                              )}
                            </div>
                            <div className="space-y-2 flex-1">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handlePhotoUpload(e, "photoUrl")}
                                className="text-sm"
                              />
                              <Input
                                placeholder="Or enter URL directly"
                                value={basicInfo.photoUrl}
                                onChange={(e) => setBasicInfo((prev) => ({ ...prev, photoUrl: e.target.value }))}
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Cover Photo</Label>
                          <div className="space-y-2">
                            {basicInfo.coverPhotoUrl && (
                              <div className="h-24 w-full rounded-lg border-2 border-slate-200 overflow-hidden bg-slate-50">
                                <img
                                  src={basicInfo.coverPhotoUrl}
                                  alt="Cover Preview"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePhotoUpload(e, "coverPhotoUrl")}
                              className="text-sm"
                            />
                            <Input
                              placeholder="Or enter URL directly"
                              value={basicInfo.coverPhotoUrl}
                              onChange={(e) => setBasicInfo((prev) => ({ ...prev, coverPhotoUrl: e.target.value }))}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end">
                      <Button
                        type="submit"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        className="gap-2"
                      >
                        {createMutation.isPending || updateMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        Save Basic Info
                      </Button>
                    </div>
                  </form>
                )}

                {!isNew && activeTab === "sections" && <SectionsEditor slug={slug} />}
                {!isNew && activeTab === "seo" && <SeoEditor slug={slug} />}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

// ─── Awards structured editor ───────────────────────────────────────────────
type Award = { title: string; year: string; organization: string }

function AwardsEditor({
  value,
  onChange,
}: {
  value: Award[]
  onChange: (val: Award[]) => void
}) {
  const add = () => onChange([...value, { title: "", year: "", organization: "" }])
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const update = (i: number, field: keyof Award, val: string) =>
    onChange(value.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)))

  return (
    <div className="space-y-3">
      {value.map((award, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start bg-white border rounded-lg p-3">
          <div className="space-y-1">
            <Label className="text-xs">Award Title</Label>
            <Input
              value={award.title}
              onChange={(e) => update(i, "title", e.target.value)}
              placeholder="e.g. Forbes 30 Under 30"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Organization</Label>
            <Input
              value={award.organization}
              onChange={(e) => update(i, "organization", e.target.value)}
              placeholder="e.g. Forbes India"
              className="h-8 text-sm"
            />
          </div>
          <div className="flex gap-2 items-end">
            <div className="space-y-1 flex-1">
              <Label className="text-xs">Year</Label>
              <Input
                value={award.year}
                onChange={(e) => update(i, "year", e.target.value)}
                placeholder="2023"
                className="h-8 text-sm"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 mb-[1px]"
              onClick={() => remove(i)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={add}>
        <Plus className="h-4 w-4" /> Add Award
      </Button>
    </div>
  )
}

// ─── Interviews structured editor ───────────────────────────────────────────
type Interview = { title: string; publication: string; year: string; url: string }

function InterviewsEditor({
  value,
  onChange,
}: {
  value: Interview[]
  onChange: (val: Interview[]) => void
}) {
  const add = () => onChange([...value, { title: "", publication: "", year: "", url: "" }])
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const update = (i: number, field: keyof Interview, val: string) =>
    onChange(value.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)))

  return (
    <div className="space-y-3">
      {value.map((interview, i) => (
        <div key={i} className="bg-white border rounded-lg p-3 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Interview Title</Label>
              <Input
                value={interview.title}
                onChange={(e) => update(i, "title", e.target.value)}
                placeholder="e.g. How Zerodha Changed Investing"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Publication</Label>
              <Input
                value={interview.publication}
                onChange={(e) => update(i, "publication", e.target.value)}
                placeholder="e.g. Economic Times"
                className="h-8 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div className="space-y-1">
              <Label className="text-xs">Year</Label>
              <Input
                value={interview.year}
                onChange={(e) => update(i, "year", e.target.value)}
                placeholder="2023"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label className="text-xs">Link URL</Label>
              <div className="flex gap-2">
                <Input
                  value={interview.url}
                  onChange={(e) => update(i, "url", e.target.value)}
                  placeholder="https://..."
                  className="h-8 text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                  onClick={() => remove(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={add}>
        <Plus className="h-4 w-4" /> Add Interview
      </Button>
    </div>
  )
}

// ─── Sections Editor ─────────────────────────────────────────────────────────
function SectionsEditor({ slug }: { slug: string }) {
  const [locale, setLocale] = React.useState<"en" | "hi">("en")
  const { data: sections, isLoading } = useGetFounderSections(slug, locale, {
    query: { enabled: !!slug, queryKey: getGetFounderSectionsQueryKey(slug, locale) },
  })
  const updateMutation = useUpdateFounderSections()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const textSections = ["Early Life", "Education", "Career", "Entrepreneurial Journey", "Challenges", "Success", "Leadership Style"]

  type SectionData = { pullQuote: string; bodyParagraphs: string; imageUrl: string; imageCaption: string }
  const [formDataEn, setFormDataEn] = React.useState<Record<string, SectionData>>({})
  const [formDataHi, setFormDataHi] = React.useState<Record<string, SectionData>>({})
  const [awardsEn, setAwardsEn] = React.useState<Award[]>([])
  const [interviewsEn, setInterviewsEn] = React.useState<Interview[]>([])
  const [imageUploading, setImageUploading] = React.useState<string | null>(null)

  const formData = locale === "en" ? formDataEn : formDataHi
  const setFormData = locale === "en" ? setFormDataEn : setFormDataHi

  React.useEffect(() => {
    if (!sections) return
    const newData: Record<string, SectionData> = {}
    textSections.forEach((key) => {
      const sec = sections.find((s) => s.sectionKey === key)
      const jd = sec?.jsonData as any
      newData[key] = {
        pullQuote: sec?.pullQuote || "",
        bodyParagraphs: sec?.bodyParagraphs ? sec.bodyParagraphs.join("\n\n") : "",
        imageUrl: jd?.imageUrl || "",
        imageCaption: jd?.imageCaption || "",
      }
    })
    if (locale === "en") {
      setFormDataEn(newData)
      const awardsSection = sections.find((s) => s.sectionKey === "Awards")
      if (awardsSection?.jsonData && Array.isArray(awardsSection.jsonData)) {
        setAwardsEn(awardsSection.jsonData as Award[])
      }
      const interviewsSection = sections.find((s) => s.sectionKey === "Interviews")
      if (interviewsSection?.jsonData && Array.isArray(interviewsSection.jsonData)) {
        setInterviewsEn(interviewsSection.jsonData as Interview[])
      }
    } else {
      setFormDataHi(newData)
    }
  }, [sections, locale])

  const handleSectionImageUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(key)
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res = await fetch(`/api/upload`, { method: "POST", body: fd, credentials: "include" })
      const { url } = await res.json()
      setFormData((prev) => ({ ...prev, [key]: { ...prev[key], imageUrl: url } }))
      toast({ title: "Image uploaded!", description: "Image is ready for this section." })
    } catch {
      toast({ title: "Upload failed", variant: "destructive" })
    } finally {
      setImageUploading(null)
    }
  }

  const handleSave = () => {
    const textPayload = textSections.map((key) => {
      const data = formData[key] || { pullQuote: "", bodyParagraphs: "", imageUrl: "", imageCaption: "" }
      const jsonData = data.imageUrl ? { imageUrl: data.imageUrl, imageCaption: data.imageCaption || "" } : null
      return {
        sectionKey: key,
        pullQuote: data.pullQuote,
        bodyParagraphs: data.bodyParagraphs
          ? data.bodyParagraphs
              .split("\n\n")
              .map((p) => p.trim())
              .filter(Boolean)
          : [],
        jsonData,
      }
    })

    const awardsPayload = locale === "en" && awardsEn.filter((a) => a.title || a.organization).length > 0
      ? [{ sectionKey: "Awards", pullQuote: "", bodyParagraphs: [], jsonData: awardsEn }]
      : []

    const interviewsPayload = locale === "en" && interviewsEn.filter((i) => i.title || i.publication).length > 0
      ? [{ sectionKey: "Interviews", pullQuote: "", bodyParagraphs: [], jsonData: interviewsEn }]
      : []

    const payload = [
      ...textPayload.filter((s) => s.pullQuote || s.bodyParagraphs.length > 0),
      ...awardsPayload,
      ...interviewsPayload,
    ]

    updateMutation.mutate(
      { slug, data: { locale, sections: payload } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetFounderSectionsQueryKey(slug, locale) })
          toast({ title: `${locale === "en" ? "English" : "Hindi"} sections saved!`, description: "Story sections updated." })
        },
        onError: () => toast({ title: "Error", description: "Failed to save sections.", variant: "destructive" }),
      }
    )
  }

  if (isLoading)
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
      </div>
    )

  return (
    <div className="space-y-6">
      {/* Language tabs */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <span className="text-sm font-semibold text-slate-600">Language:</span>
        <div className="flex border border-slate-200 overflow-hidden rounded-lg">
          <button
            onClick={() => setLocale("en")}
            className={`px-5 py-2 text-sm font-semibold transition-colors ${locale === "en" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
          >
            English (EN)
          </button>
          <div className="w-px bg-slate-200" />
          <button
            onClick={() => setLocale("hi")}
            className={`px-5 py-2 text-sm font-semibold transition-colors ${locale === "hi" ? "bg-primary text-white" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"}`}
            style={locale === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
          >
            हिंदी (HI)
          </button>
        </div>
        {locale === "hi" && (
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md">
            Hindi content will be served at <code className="font-mono">/founder/hi/{slug}</code>
          </p>
        )}
      </div>

      <div className="space-y-10">
        {textSections.map((key) => (
          <div key={`${locale}-${key}`} className="space-y-4 border rounded-xl p-6 bg-slate-50/50">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">{key}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Pull Quote</Label>
                <Input
                  placeholder={locale === "hi" ? `${key} ka highlight quote...` : `Highlight quote from ${key.toLowerCase()}...`}
                  value={formData[key]?.pullQuote || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [key]: { ...prev[key], pullQuote: e.target.value } }))
                  }
                  style={locale === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                />
              </div>
              <div className="space-y-2">
                <Label>Body Content</Label>
                <p className="text-xs text-slate-500">Separate paragraphs with a blank line.</p>
                <Textarea
                  className="min-h-[180px]"
                  placeholder={locale === "hi" ? "Hindi mein kahani likhein..." : "Write the story here..."}
                  value={formData[key]?.bodyParagraphs || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [key]: { ...prev[key], bodyParagraphs: e.target.value },
                    }))
                  }
                  style={locale === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                />
              </div>

              {/* ── Article Image ── */}
              <div className="space-y-3 pt-3 border-t border-dashed border-slate-200">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-slate-400" />
                  <Label className="text-sm font-semibold text-slate-700">Section Image <span className="font-normal text-slate-400">(optional — shown inside article)</span></Label>
                </div>
                <div className="flex items-start gap-4">
                  {formData[key]?.imageUrl && (
                    <div className="relative h-20 w-32 flex-shrink-0 rounded-md overflow-hidden border border-slate-200 bg-slate-50">
                      <img src={formData[key].imageUrl} alt="Section" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, [key]: { ...prev[key], imageUrl: "", imageCaption: "" } }))}
                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow text-red-500 hover:bg-red-50"
                        title="Remove image"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-primary border border-slate-200 hover:border-primary px-3 py-1.5 rounded-md transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSectionImageUpload(key, e)}
                          disabled={imageUploading === key}
                        />
                        {imageUploading === key ? (
                          <><Loader2 className="h-3 w-3 animate-spin" /> Uploading...</>
                        ) : (
                          <><ImageIcon className="h-3 w-3" /> Upload Image</>
                        )}
                      </label>
                      <span className="text-xs text-slate-400">or</span>
                      <Input
                        className="h-7 text-xs flex-1"
                        placeholder="Paste image URL..."
                        value={formData[key]?.imageUrl || ""}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [key]: { ...prev[key], imageUrl: e.target.value } }))}
                      />
                    </div>
                    <Input
                      className="h-7 text-xs"
                      placeholder="Caption (optional)..."
                      value={formData[key]?.imageCaption || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [key]: { ...prev[key], imageCaption: e.target.value } }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Awards — only for English */}
        {locale === "en" && (
          <div className="space-y-4 border rounded-xl p-6 bg-slate-50/50">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">Awards & Recognition</h3>
            <AwardsEditor value={awardsEn} onChange={setAwardsEn} />
          </div>
        )}

        {/* Interviews — only for English */}
        {locale === "en" && (
          <div className="space-y-4 border rounded-xl p-6 bg-slate-50/50">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">Interviews & Media</h3>
            <InterviewsEditor value={interviewsEn} onChange={setInterviewsEn} />
          </div>
        )}

        <div className="sticky bottom-4 bg-white/90 backdrop-blur border p-4 rounded-xl shadow-lg flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Saving: <span className="font-semibold text-slate-800">{locale === "en" ? "English" : "Hindi"}</span> sections
          </span>
          <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2 px-8">
            {updateMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save {locale === "en" ? "English" : "Hindi"} Sections
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── SEO Editor ──────────────────────────────────────────────────────────────
function SeoEditor({ slug }: { slug: string }) {
  const { data: seo, isLoading } = useGetFounderSeo(slug, {
    query: { enabled: !!slug, queryKey: getGetFounderSeoQueryKey(slug) },
  })
  const updateMutation = useUpdateFounderSeo()
  const { toast } = useToast()

  const [formData, setFormData] = React.useState({
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogImage: "",
    ogTitle: "",
    twitterCard: "",
    schemaType: "",
    focusKeyword: "",
    robots: "",
  })

  React.useEffect(() => {
    if (seo) {
      setFormData({
        seoTitle: seo.seoTitle || "",
        seoDescription: seo.seoDescription || "",
        keywords: seo.keywords || "",
        canonicalUrl: seo.canonicalUrl || "",
        ogImage: seo.ogImage || "",
        ogTitle: seo.ogTitle || "",
        twitterCard: seo.twitterCard || "",
        schemaType: seo.schemaType || "",
        focusKeyword: seo.focusKeyword || "",
        robots: seo.robots || "",
      })
    }
  }, [seo])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(
      { slug, data: formData },
      {
        onSuccess: () => toast({ title: "SEO saved!", description: "Meta details have been updated." }),
        onError: () => toast({ title: "Error", description: "Failed to save SEO.", variant: "destructive" }),
      }
    )
  }

  if (isLoading)
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
      </div>
    )

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label>SEO Title</Label>
          <Input
            value={formData.seoTitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, seoTitle: e.target.value }))}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>SEO Description</Label>
          <Textarea
            value={formData.seoDescription}
            onChange={(e) => setFormData((prev) => ({ ...prev, seoDescription: e.target.value }))}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Keywords (Comma separated)</Label>
          <Input
            value={formData.keywords}
            onChange={(e) => setFormData((prev) => ({ ...prev, keywords: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Focus Keyword</Label>
          <Input
            value={formData.focusKeyword}
            onChange={(e) => setFormData((prev) => ({ ...prev, focusKeyword: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input
            value={formData.canonicalUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, canonicalUrl: e.target.value }))}
          />
        </div>

        <div className="space-y-2 md:col-span-2 pt-4 border-t">
          <h4 className="font-semibold mb-2">Social Sharing (Open Graph)</h4>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>OG Title</Label>
          <Input
            value={formData.ogTitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, ogTitle: e.target.value }))}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>OG Image URL</Label>
          <Input
            value={formData.ogImage}
            onChange={(e) => setFormData((prev) => ({ ...prev, ogImage: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label>Twitter Card Type</Label>
          <Select
            value={formData.twitterCard}
            onChange={(e) => setFormData((prev) => ({ ...prev, twitterCard: e.target.value }))}
          >
            <option value="">Default</option>
            <option value="summary">Summary</option>
            <option value="summary_large_image">Summary Large Image</option>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2 pt-4 border-t">
          <h4 className="font-semibold mb-2">Technical</h4>
        </div>
        <div className="space-y-2">
          <Label>Schema Type</Label>
          <Select
            value={formData.schemaType}
            onChange={(e) => setFormData((prev) => ({ ...prev, schemaType: e.target.value }))}
          >
            <option value="">Default</option>
            <option value="Person">Person</option>
            <option value="Organization">Organization</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Robots Directive</Label>
          <Select
            value={formData.robots}
            onChange={(e) => setFormData((prev) => ({ ...prev, robots: e.target.value }))}
          >
            <option value="">Default</option>
            <option value="index follow">index, follow</option>
            <option value="noindex">noindex</option>
            <option value="noindex nofollow">noindex, nofollow</option>
          </Select>
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end">
        <Button type="submit" disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save SEO Meta
        </Button>
      </div>
    </form>
  )
}
