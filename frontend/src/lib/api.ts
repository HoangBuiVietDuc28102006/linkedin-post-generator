const API_BASE_URL = "http://localhost:8000"

export async function generatePost(payload: {
  topic: string
  description: string
  keywords: string
  tone: "professional" | "casual"
  length: string
}) {
  const res = await fetch(`${API_BASE_URL}/api/generate-post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
