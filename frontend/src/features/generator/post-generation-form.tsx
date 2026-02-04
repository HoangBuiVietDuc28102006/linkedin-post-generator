import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Slider from "@/components/ui/slider"

export type Topic = "AI" | "Financial" | ""
export type Tone = "Professional" | "Casual" | ""
export type LengthPreset = "Short" | "Medium" | "Long" | "Custom" | ""

export interface PostGenerationFormValues {
  topic: Topic
  description: string
  keywords: string // comma-separated input
  tone: Tone
  lengthPreset: LengthPreset
  customWords: number
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
  customWords: 30,
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

  function handleReset() {
    setForm(initialValues)
  }

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
      {/* Description */}
      <div className="flex flex-col gap-[12px]">
        <label className="text-sm font-medium text-white">Description</label>
        <Textarea
          rows={5}
          placeholder="Write a brief description for the post..."
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {/* Topic */}
      <div className="flex flex-row items-center gap-[12px]">
        <label className="text-sm font-medium text-white">Topic</label>
        <select
          className="h-10 w-[18em] rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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



      {/* Keywords */}
      <div className="flex flex-row items-center gap-[12px]">
        <label className="text-sm font-medium text-white">Keywords</label>
        <Input
          placeholder="e.g. AI, productivity, automation"
          value={form.keywords}
          onChange={(e) => update("keywords", e.target.value)}
        />
      </div>

      {/* Tone */}
      <div className="flex flex-row items-center gap-[12px]">
        <label className="text-sm font-medium text-white">Tone</label>
        <select
          className="h-10 w-[18em] rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-row items-center gap-[12px]">
          <label className="text-sm font-medium text-white">Length</label>
          <select
            className="h-10 w-[17em] rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={form.lengthPreset}
            onChange={(e) => {
              const preset = e.target.value as LengthPreset
              update("lengthPreset", preset)
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
        </div>

        {form.lengthPreset === "Custom" && (
          <div className="w-full">
            <Slider
              min={20} max={2000}
              value={form.customWords}
              step={1}
              onChange={(value) => update("customWords", value)}
            />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center gap-[12px]">
        <Button type="submit" disabled={!canSubmit}>
          {loading ? "Generating..." : "Generate"}
        </Button>

        {/* Reset button */}
        <Button
          type="button"
          variant="secondary"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </form >
  )
}
