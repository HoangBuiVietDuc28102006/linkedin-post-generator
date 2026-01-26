import * as React from "react"
import logo from "@/assets/LIPG.png"
import { navigation } from "@/config/navigation"
import { SidebarItem } from "@/components/layout/sidebar-item"
import { SidebarSection } from "@/components/layout/sidebar-section"
import { Sparkles, Clock, Settings, User, PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const icons = {
  sparkles: Sparkles,
  clock: Clock,
  settings: Settings,
}

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <aside
      className={cn(
        "min-h-screen bg-zinc-900 flex flex-col transition-[width] duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Top */}
      <div>
        {/* Logo + Toggle */}
        <div className="relative flex items-center justify-center py-6">
          <img src={logo} alt="LIPG logo" className="h-8 w-auto" />

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "absolute right-3 inline-flex h-8 w-8 items-center justify-center rounded-md",
              "text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
            )}
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800" />

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-6">
            {navigation.map((section) => (
              <li key={section.title ?? "main"}>
                <SidebarSection title={section.title}>
                  {section.items.map((item) => {
                    const Icon = item.icon
                      ? icons[item.icon as keyof typeof icons]
                      : undefined

                    return (
                      <li key={item.href}>
                        <SidebarItem to={item.href} label={item.label} Icon={Icon} />
                      </li>
                    )
                  })}
                </SidebarSection>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom user info */}
      <div className="mt-auto border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800">
            <User className="h-4 w-4 text-zinc-400" />
          </div>

          {/* User name */}
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">John Doe</div>
            <div className="text-xs text-zinc-400 truncate">Free plan</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
