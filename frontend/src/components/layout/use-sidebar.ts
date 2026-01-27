import * as React from "react"

export interface UseSidebarResult {
  collapsed: boolean
  toggle: () => void
  setCollapsed: (value: boolean) => void
}

export function useSidebar(initialCollapsed = false): UseSidebarResult {
  const [collapsed, setCollapsed] = React.useState<boolean>(initialCollapsed)

  const toggle = React.useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  return { collapsed, toggle, setCollapsed }
}
