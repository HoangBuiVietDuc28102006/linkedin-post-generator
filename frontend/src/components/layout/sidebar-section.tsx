import * as React from "react"

export interface SidebarSectionProps {
  title?: string
  children: React.ReactNode
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <section>
      {title ? (
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          {title}
        </div>
      ) : null}

      <ul className="space-y-1">{children}</ul>
    </section>
  )
}
