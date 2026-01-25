import * as React from "react"
import { Sidebar } from "@/components/layout/sidebar"

export interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
