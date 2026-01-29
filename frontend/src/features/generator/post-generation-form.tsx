import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export type Topic = "AI" | "Financial" | ""
export type Tone = "Professional" | "Casual" | ""
export type LengthPreset = "Short" | "Medium" | "Long" | "Custom" | ""

export interface PostGenerationFormValues {
  topic: Topic
  description: string
  keywords: string // comma-separated input
  tone: Tone
  lengthPreset: LengthPreset
  customWords: string
}

export interface PostGenerationFormProps {
  onGenerated: (result: string) => void
  onError?: (message: string) => void
}

const initialValues: PostGenerationFormValues = {
  topic: "",
  description: "",
  keywords: "",
  tone: "",
  lengthPreset: "",
  customWords: "",
}

function parseKeywords(input: string): string[] {
  // "ai, productivity, automation" -> ["ai", "productivity", "automation"]
  return input
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
}

export function PostGenerationForm({ onGenerated, onError }: PostGenerationFormProps) {
  const [form, setForm] = React.useState<PostGenerationFormValues>(initialValues)
  const [loading, setLoading] = React.useState(false)

  function update<K extends keyof PostGenerationFormValues>(
    key: K,
    value: PostGenerationFormValues[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const length =
        form.lengthPreset === "Custom"
          ? Number(form.customWords)
          : form.lengthPreset

      if (form.lengthPreset === "Custom") {
        const n = Number(form.customWords)
        if (!Number.isFinite(n) || n <= 0) {
          throw new Error("Please enter a valid number of words.")
        }
      }

      const response = await fetch("http://127.0.0.1:8000/api/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: form.topic,
          description: form.description,
          keywords: parseKeywords(form.keywords),
          tone: form.tone,
          length,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || "Failed to generate post")
      }

      const data: { content: string } = await response.json()
      onGenerated(data.content)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong"
      console.error(err)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  const canSubmit =
    !loading &&
    !!form.topic &&
    !!form.tone &&
    !!form.lengthPreset &&
    (form.lengthPreset !== "Custom" || !!form.customWords) &&
    form.description.trim().length >= 5

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* Topic */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Topic</label>
        <select
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.topic}
          onChange={(e) => update("topic", e.target.value as Topic)}
        >
          <option value="" disabled>
            Select a topic
          </option>
          <option value="AI">AI</option>
          <option value="Financial">Financial</option>
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Short description</label>
        <Textarea
          rows={3}
          placeholder="Write a brief description for the post..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Keywords</label>
        <Input
          placeholder="e.g. AI, productivity, automation"
          value={form.keywords}
          onChange={(e) => update("keywords", e.target.value)}
        />
      </div>

      {/* Tone */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Tone</label>
        <select
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.tone}
          onChange={(e) => update("tone", e.target.value as Tone)}
        >
          <option value="" disabled>
            Select tone
          </option>
          <option value="Professional">Professional</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      {/* Length */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Length</label>
        <select
          className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={form.lengthPreset}
          onChange={(e) => {
            const preset = e.target.value as LengthPreset
            update("lengthPreset", preset)
            if (preset !== "Custom") update("customWords", "")
          }}
        >
          <option value="" disabled>
            Select length
          </option>
          <option value="Short">Short</option>
          <option value="Medium">Medium</option>
          <option value="Long">Long</option>
          <option value="Custom">Custom (number of words)</option>
        </select>

        {form.lengthPreset === "Custom" && (
          <Input
            type="number"
            min={1}
            placeholder="Enter number of words (e.g. 120)"
            value={form.customWords}
            onChange={(e) => update("customWords", e.target.value)}
          />
        )}
      </div>

      <Button type="submit" className="w-full" disabled={!canSubmit}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  )
}
