import * as React from "react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

export interface SidebarItemProps {
  to: string
  label: string
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  onClose?: () => void
}

export function SidebarItem({ to, label, Icon, onClose }: SidebarItemProps) {
  const handleClick = () => {
    // Mobile only (Tailwind md breakpoint = 768px)
    if (window.innerWidth < 768) {
      onClose?.()
    }
  }

  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={handleClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          "text-zinc-200 hover:bg-zinc-800 hover:text-white",
          isActive && "bg-zinc-800 text-white"
        )
      }
    >
      {({ isActive }) => (
        <>
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4 transition-colors",
                isActive ? "text-blue-500" : "text-zinc-400"
              )}
            />
          )}
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}
