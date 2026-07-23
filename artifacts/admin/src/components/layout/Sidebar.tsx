import * as React from "react"
import { Link, useLocation } from "wouter"
import { LayoutDashboard, Users, Tag, LogOut, FileText, Menu, X } from "lucide-react"
import { useLogout, useGetMe } from "@workspace/api-client-react"
import { Button } from "../ui"

export function Sidebar() {
  const [location] = useLocation()
  const logout = useLogout()
  const { data: me } = useGetMe()
  const [isOpen, setIsOpen] = React.useState(false)

  const navGroups = [
    {
      label: "Overview",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      ],
    },
    {
      label: "Content",
      items: [
        { icon: Users, label: "Founder Stories", href: "/founders" },
      ],
    },
    {
      label: "Taxonomy",
      items: [
        { icon: Tag, label: "Categories", href: "/categories" },
      ],
    },
  ]

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/login"
      }
    })
  }

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight">ProfileBizz.</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out
        md:translate-x-0 md:static md:flex md:flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b hidden md:flex gap-2">
          <div className="h-6 w-6 bg-primary rounded-sm flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight">ProfileBizz.</span>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-4 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-4 pb-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href))
                  return (
                    <Link key={item.href} href={item.href} className="block" onClick={() => setIsOpen(false)}>
                      <div className={`
                        flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                        ${isActive
                          ? 'bg-secondary text-secondary-foreground'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        }
                      `}>
                        <item.icon className={`mr-3 h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        {item.label}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center px-4 py-3 mb-2 rounded-md bg-secondary/30">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
              {me?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-foreground truncate">{me?.username || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Editor</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </>
  )
}
