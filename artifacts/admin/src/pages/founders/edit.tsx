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
  getGetFounderQueryKey,
  getGetFounderSectionsQueryKey,
  getGetFounderSeoQueryKey
} from "@workspace/api-client-react"
import { AdminLayout } from "../../components/layout/AdminLayout"
import { Button, Input, Textarea, Label, Select } from "../../components/ui"
import { Loader2, ArrowLeft, Image as ImageIcon, Save } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

export default function FounderEdit() {
  const params = useParams()
  const [location, setLocation] = useLocation()
  
  // Wouter hook doesn't provide searchParams directly, we can read it from window
  const searchString = typeof window !== 'undefined' ? window.location.search : ''
  const searchParams = new URLSearchParams(searchString)
  
  // Guard isNew correctly
  const isNew = !params.id && !params.slug && location.endsWith('/new')
  const slug = params.slug as string || ""
  
  const [activeTab, setActiveTab] = React.useState(searchParams.get("tab") || "basic")

  const queryClient = useQueryClient()

  const { data: founder, isLoading: isLoadingFounder } = useGetFounder(slug, {
    query: { enabled: !isNew && !!slug, queryKey: getGetFounderQueryKey(slug) }
  })

  // Basic Info Form
  const [basicInfo, setBasicInfo] = React.useState({
    name: "", designation: "", profileType: "", profileTag: "", category: "",
    location: "", founded: "", revenue: "", employees: "", age: "",
    photoUrl: "", coverPhotoUrl: "", oneLiner: "", executiveSummary: "", published: false
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
        published: founder.published || false
      })
    }
  }, [founder])

  const createMutation = useCreateFounder()
  const updateMutation = useUpdateFounder()

  const handleBasicInfoSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (isNew) {
      createMutation.mutate({ data: basicInfo as any }, {
        onSuccess: (newFounder) => {
          setLocation(`/founders/${newFounder.slug}/edit`)
        }
      })
    } else {
      updateMutation.mutate({ slug, data: basicInfo as any }, {
        onSuccess: (updated) => {
          queryClient.setQueryData(getGetFounderQueryKey(slug), updated)
          alert("Saved successfully")
        }
      })
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "photoUrl" | "coverPhotoUrl") => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    
    try {
      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })
      const { url } = await res.json()
      setBasicInfo(prev => ({ ...prev, [field]: url }))
    } catch (err) {
      alert("Failed to upload photo")
    }
  }

  // Render Form
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
              {isNew ? "New Profile" : `Edit ${founder?.name || 'Profile'}`}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {!isNew && (
              <span className="text-sm font-medium text-slate-500">
                {basicInfo.published ? "Published" : "Draft"}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex border-b overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "basic" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab("sections")}
              disabled={isNew}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "sections" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              } ${isNew ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Story Sections
            </button>
            <button
              onClick={() => setActiveTab("seo")}
              disabled={isNew}
              className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === "seo" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              } ${isNew ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              SEO Meta
            </button>
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
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border">
                      <div className="space-y-0.5">
                        <Label className="text-base font-semibold">Publish Status</Label>
                        <p className="text-sm text-slate-500">Make this profile visible to the public.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={basicInfo.published} onChange={e => setBasicInfo(prev => ({ ...prev, published: e.target.checked }))} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input required value={basicInfo.name} onChange={e => setBasicInfo(prev => ({ ...prev, name: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Designation *</Label>
                        <Input required value={basicInfo.designation} onChange={e => setBasicInfo(prev => ({ ...prev, designation: e.target.value }))} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={basicInfo.category} onChange={e => setBasicInfo(prev => ({ ...prev, category: e.target.value }))}>
                          <option value="">Select Category</option>
                          <option value="Startup Founder">Startup Founder</option>
                          <option value="Women Founder">Women Founder</option>
                          <option value="D2C Pioneer">D2C Pioneer</option>
                          <option value="Rural Founder">Rural Founder</option>
                          <option value="Corporate Leader">Corporate Leader</option>
                          <option value="Social Entrepreneur">Social Entrepreneur</option>
                          <option value="Tech Builder">Tech Builder</option>
                          <option value="Legacy Builder">Legacy Builder</option>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={basicInfo.location} onChange={e => setBasicInfo(prev => ({ ...prev, location: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Founded Year</Label>
                        <Input value={basicInfo.founded} onChange={e => setBasicInfo(prev => ({ ...prev, founded: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Revenue</Label>
                        <Input value={basicInfo.revenue} onChange={e => setBasicInfo(prev => ({ ...prev, revenue: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Employees</Label>
                        <Input value={basicInfo.employees} onChange={e => setBasicInfo(prev => ({ ...prev, employees: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input value={basicInfo.age} onChange={e => setBasicInfo(prev => ({ ...prev, age: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Type</Label>
                        <Input value={basicInfo.profileType} onChange={e => setBasicInfo(prev => ({ ...prev, profileType: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Profile Tag</Label>
                        <Input value={basicInfo.profileTag} onChange={e => setBasicInfo(prev => ({ ...prev, profileTag: e.target.value }))} />
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>One-Liner Tagline</Label>
                        <Input value={basicInfo.oneLiner} onChange={e => setBasicInfo(prev => ({ ...prev, oneLiner: e.target.value }))} placeholder="A short punchy summary of the founder..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Executive Summary</Label>
                        <Textarea 
                          value={basicInfo.executiveSummary} 
                          onChange={e => setBasicInfo(prev => ({ ...prev, executiveSummary: e.target.value }))} 
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>

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
                              <Input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, "photoUrl")} className="text-sm" />
                              <Input placeholder="Or enter URL directly" value={basicInfo.photoUrl} onChange={e => setBasicInfo(prev => ({ ...prev, photoUrl: e.target.value }))} className="h-8 text-sm" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label>Cover Photo</Label>
                          <div className="space-y-2">
                            {basicInfo.coverPhotoUrl && (
                              <div className="h-24 w-full rounded-lg border-2 border-slate-200 overflow-hidden bg-slate-50">
                                <img src={basicInfo.coverPhotoUrl} alt="Cover Preview" className="h-full w-full object-cover" />
                              </div>
                            )}
                            <Input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(e, "coverPhotoUrl")} className="text-sm" />
                            <Input placeholder="Or enter URL directly" value={basicInfo.coverPhotoUrl} onChange={e => setBasicInfo(prev => ({ ...prev, coverPhotoUrl: e.target.value }))} className="h-8 text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t flex justify-end">
                      <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="gap-2">
                        {createMutation.isPending || updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Basic Info
                      </Button>
                    </div>
                  </form>
                )}

                {!isNew && activeTab === "sections" && (
                  <SectionsEditor slug={slug} />
                )}

                {!isNew && activeTab === "seo" && (
                  <SeoEditor slug={slug} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function SectionsEditor({ slug }: { slug: string }) {
  const { data: sections, isLoading } = useGetFounderSections(slug, {
    query: { enabled: !!slug, queryKey: getGetFounderSectionsQueryKey(slug) }
  })
  const updateMutation = useUpdateFounderSections()
  
  const sectionKeys = [
    "Early Life", "Education", "Career", "Entrepreneurial Journey", 
    "Challenges", "Success", "Leadership Style", "Awards", "Interviews"
  ]

  const [formData, setFormData] = React.useState<Record<string, { pullQuote: string, bodyParagraphs: string, jsonData: string }>>({})

  React.useEffect(() => {
    if (sections) {
      const newData: any = {}
      sectionKeys.forEach(key => {
        const sec = sections.find(s => s.sectionKey === key)
        newData[key] = {
          pullQuote: sec?.pullQuote || "",
          bodyParagraphs: sec?.bodyParagraphs ? sec.bodyParagraphs.join("\n\n") : "",
          jsonData: sec?.jsonData ? JSON.stringify(sec.jsonData, null, 2) : ""
        }
      })
      setFormData(newData)
    }
  }, [sections])

  const handleSave = () => {
    const payload = sectionKeys.map(key => {
      const data = formData[key] || { pullQuote: "", bodyParagraphs: "", jsonData: "" }
      
      let parsedJson = null
      if (data.jsonData) {
        try {
          parsedJson = JSON.parse(data.jsonData)
        } catch(e) {
          alert(`Invalid JSON in ${key}`)
          throw e
        }
      }

      return {
        sectionKey: key,
        pullQuote: data.pullQuote,
        bodyParagraphs: data.bodyParagraphs ? data.bodyParagraphs.split("\n\n").map(p => p.trim()).filter(Boolean) : [],
        jsonData: parsedJson
      }
    }).filter(sec => sec.pullQuote || (sec.bodyParagraphs && sec.bodyParagraphs.length > 0) || sec.jsonData)

    updateMutation.mutate({ slug, data: { sections: payload } }, {
      onSuccess: () => alert("Sections saved successfully!")
    })
  }

  if (isLoading) return <div className="py-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-slate-300" /></div>

  return (
    <div className="space-y-12">
      {sectionKeys.map(key => {
        const isJson = key === "Awards" || key === "Interviews"
        return (
          <div key={key} className="space-y-4 border rounded-xl p-6 bg-slate-50/50">
            <h3 className="text-lg font-serif font-bold text-slate-900 border-b pb-2">{key}</h3>
            
            <div className="space-y-4">
              {!isJson && (
                <div className="space-y-2">
                  <Label>Pull Quote</Label>
                  <Input 
                    placeholder={`Highlight quote from ${key.toLowerCase()}`}
                    value={formData[key]?.pullQuote || ""} 
                    onChange={e => setFormData(prev => ({ ...prev, [key]: { ...prev[key], pullQuote: e.target.value } }))} 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>{isJson ? "JSON Data" : "Body Content (Separate paragraphs with blank lines)"}</Label>
                <Textarea 
                  className={`min-h-[160px] ${isJson ? 'font-mono text-xs bg-slate-800 text-slate-100 placeholder:text-slate-500' : ''}`}
                  placeholder={isJson ? '[\n  { "title": "...", "year": "..." }\n]' : "Write the story here..."}
                  value={isJson ? (formData[key]?.jsonData || "") : (formData[key]?.bodyParagraphs || "")} 
                  onChange={e => {
                    const val = e.target.value
                    setFormData(prev => ({ 
                      ...prev, 
                      [key]: { ...prev[key], [isJson ? 'jsonData' : 'bodyParagraphs']: val } 
                    }))
                  }} 
                />
              </div>
            </div>
          </div>
        )
      })}
      
      <div className="sticky bottom-4 bg-white/90 backdrop-blur border p-4 rounded-xl shadow-lg flex justify-end">
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2 px-8">
          {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save All Sections
        </Button>
      </div>
    </div>
  )
}

function SeoEditor({ slug }: { slug: string }) {
  const { data: seo, isLoading } = useGetFounderSeo(slug, {
    query: { enabled: !!slug, queryKey: getGetFounderSeoQueryKey(slug) }
  })
  const updateMutation = useUpdateFounderSeo()

  const [formData, setFormData] = React.useState({
    seoTitle: "", seoDescription: "", keywords: "", canonicalUrl: "",
    ogImage: "", ogTitle: "", twitterCard: "", schemaType: "",
    focusKeyword: "", robots: ""
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
        robots: seo.robots || ""
      })
    }
  }, [seo])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate({ slug, data: formData }, {
      onSuccess: () => alert("SEO details saved successfully!")
    })
  }

  if (isLoading) return <div className="py-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-slate-300" /></div>

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label>SEO Title</Label>
          <Input value={formData.seoTitle} onChange={e => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>SEO Description</Label>
          <Textarea value={formData.seoDescription} onChange={e => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Keywords (Comma separated)</Label>
          <Input value={formData.keywords} onChange={e => setFormData(prev => ({ ...prev, keywords: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Focus Keyword</Label>
          <Input value={formData.focusKeyword} onChange={e => setFormData(prev => ({ ...prev, focusKeyword: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input value={formData.canonicalUrl} onChange={e => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))} />
        </div>
        
        <div className="space-y-2 md:col-span-2 pt-4 border-t">
          <h4 className="font-semibold mb-2">Social Sharing (Open Graph)</h4>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>OG Title</Label>
          <Input value={formData.ogTitle} onChange={e => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>OG Image URL</Label>
          <Input value={formData.ogImage} onChange={e => setFormData(prev => ({ ...prev, ogImage: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <Label>Twitter Card Type</Label>
          <Select value={formData.twitterCard} onChange={e => setFormData(prev => ({ ...prev, twitterCard: e.target.value }))}>
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
          <Select value={formData.schemaType} onChange={e => setFormData(prev => ({ ...prev, schemaType: e.target.value }))}>
            <option value="">Default</option>
            <option value="Person">Person</option>
            <option value="Organization">Organization</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Robots Directive</Label>
          <Select value={formData.robots} onChange={e => setFormData(prev => ({ ...prev, robots: e.target.value }))}>
            <option value="">Default</option>
            <option value="index follow">index, follow</option>
            <option value="noindex">noindex</option>
            <option value="noindex nofollow">noindex, nofollow</option>
          </Select>
        </div>
      </div>

      <div className="pt-6 border-t flex justify-end">
        <Button type="submit" disabled={updateMutation.isPending} className="gap-2">
          {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save SEO Meta
        </Button>
      </div>
    </form>
  )
}
