import * as React from "react"
import logo from "@/assets/LIPG.png"
import { navigation } from "@/config/navigation"
import { SidebarItem } from "@/components/layout/sidebar-item"
import { SidebarSection } from "@/components/layout/sidebar-section"
import { Sparkles, Clock, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const icons = {
  sparkles: Sparkles,
  clock: Clock,
  settings: Settings,
}

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "w-64 bg-zinc-900 flex flex-col",
          // Desktop: visible and static
          "md:static md:translate-x-0 md:min-h-screen md:z-auto",
          // Mobile: drawer (always exists, just moves off-canvas)
          "fixed inset-y-0 left-0 z-50 min-h-screen transform transition-transform md:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        aria-label="Sidebar"
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-6">
          <img src={logo} alt="LIPG logo" className="h-8 w-auto" />
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
                        <SidebarItem
                          to={item.href}
                          label={item.label}
                          Icon={Icon}
                          onClick={onClose} // on desktop this is harmless
                        />
                      </li>
                    )
                  })}
                </SidebarSection>
              </li>
            ))}
          </ul>
        </nav>

        {/* User block */}
        <div className="mt-auto border-t border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800">
              <User className="h-4 w-4 text-zinc-400" />
            </div>

            <div className="min-w-0">
              <div className="text-sm font-medium text-white truncate">
                John Doe
              </div>
              <div className="text-xs text-zinc-400 truncate">Free plan</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
