import { useState, useRef, useEffect } from "react"
import {
  Sparkles,
  Palette,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

type UserMenuProps = {
  name: string
  handle?: string
  plan?: string
  onNavigate?: () => void // ✅ NEW
}

export function UserMenu({
  name,
  handle = "@username",
  plan = "Free",
  onNavigate,
}: UserMenuProps) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full rounded-2xl border border-zinc-800 bg-zinc-800/40 px-3 py-3",
          "flex items-center gap-3 text-left",
          "hover:bg-zinc-800/70 transition-colors"
        )}
      >
        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 border border-zinc-700">
          <span className="text-xs font-semibold text-zinc-200">
            {initials}
          </span>
        </div>

        {/* Name */}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-white truncate">
            {name}
          </div>
          <div className="text-xs text-zinc-400 truncate">
            {handle}
          </div>
        </div>

        {/* Plan */}
        <div className="text-[11px] px-2 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200">
          {plan}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-xl z-50">
          <MenuItem icon={Sparkles} label="Upgrade plan" />
          <MenuItem icon={Palette} label="Personalization" />

          <MenuItem
            icon={Settings}
            label="Settings"
            onClick={() => {
              navigate("/settings")
              setOpen(false)
              onNavigate?.() // ✅ close sidebar
            }}
          />

          <Divider />

          <MenuItem icon={HelpCircle} label="Help" right="›" />

          <Divider />

          <MenuItem icon={LogOut} label="Log out" danger />
        </div>
      )}
    </div>
  )
}

function MenuItem({
  icon: Icon,
  label,
  right,
  danger,
  onClick,
}: {
  icon: any
  label: string
  right?: string
  danger?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
        danger
          ? "text-red-300 hover:bg-red-500/10"
          : "text-zinc-200 hover:bg-zinc-800"
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {right && <span className="text-zinc-500">{right}</span>}
    </button>
  )
}

function Divider() {
  return <div className="my-2 h-px bg-zinc-800" />
}
