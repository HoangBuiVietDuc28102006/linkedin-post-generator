import * as React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Menu } from "lucide-react"
import logo from "@/assets/LIPG.png"

export interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 border-b border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-zinc-900"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5 text-zinc-200" />
        </button>

        <img
          src={logo}
          alt="LIPG logo"
          className="h-6 w-auto"
        />
      </header>

      <div className="min-h-screen md:flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main
          className="flex-1"
          onClick={() => {
            // Mobile: tapping main content closes drawer if open
            if (sidebarOpen) setSidebarOpen(false)
          }}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
