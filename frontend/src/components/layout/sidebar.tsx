import * as React from "react"
import logo from "@/assets/LIPG.png"
import { navigation } from "@/config/navigation"

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-zinc-900">
      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <img src={logo} alt="LIPG logo" className="h-8 w-auto" />
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800" />

      {/* Navigation */}
      <nav className="px-3 py-4">
        <ul className="space-y-6">
          {navigation.map((section) => (
            <li key={section.title ?? "section"}>
              {section.title ? (
                <div className="px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {section.title}
                </div>
              ) : null}

              <ul className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block rounded-md px-2 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
