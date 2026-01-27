import * as React from "react"

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(() =>
    window.matchMedia(query).matches
  )

  React.useEffect(() => {
    const media = window.matchMedia(query)
    const listener = () => setMatches(media.matches)

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
