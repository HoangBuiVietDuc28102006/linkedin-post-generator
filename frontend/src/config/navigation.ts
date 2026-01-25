export interface NavigationItem {
  label: string
  href: string
  icon?: string
}

export interface NavigationSection {
  title?: string
  items: NavigationItem[]
}

export const navigation: NavigationSection[] = [
  {
    title: "Generator",
    items: [
      {
        label: "Create Post",
        href: "/",
        icon: "sparkles",
      },
      {
        label: "History",
        href: "/history",
        icon: "clock",
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        label: "Preferences",
        href: "/settings",
        icon: "settings",
      },
    ],
  },
]
