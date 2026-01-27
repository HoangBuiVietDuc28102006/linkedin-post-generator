import * as React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export type Topic = "ai" | "financial" | ""
export type Tone = "professional" | "casual" | ""
export type LengthPreset = "short" | "medium" | "long" | "custom" | ""

export interface PostGenerationFormValues {
  topic: Topic
  shortDescription: string
  keywords: string
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
  shortDescription: "",
  keywords: "",
  tone: "",
  lengthPreset: "",
  customWords: "",
}

export function PostGenerationForm({
  onGenerated,
  onError,
}: PostGenerationFormProps) {
  const [form, setForm] =
    React.useState<PostGenerationFormValues>(initialValues)

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
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: form.topic,
          short_description: form.shortDescription,
          keywords: form.keywords,
          tone: form.tone,
          length:
            form.lengthPreset === "custom"
              ? Number(form.customWords)
              : form.lengthPreset,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || "Failed to generate post")
      }

      const data: { result: string } = await response.json()
      onGenerated(data.result)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong"
      console.error(err)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

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
          <option value="ai">AI</option>
          <option value="financial">Financial</option>
        </select>
      </div>

      {/* Short description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Short description
        </label>
        <Textarea
          rows={3}
          placeholder="Write a brief description for the post..."
          value={form.shortDescription}
          onChange={(e) => update("shortDescription", e.target.value)}
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
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
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
            if (preset !== "custom") update("customWords", "")
          }}
        >
          <option value="" disabled>
            Select length
          </option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
          <option value="custom">Custom (number of words)</option>
        </select>

        {form.lengthPreset === "custom" && (
          <Input
            type="number"
            min={1}
            placeholder="Enter number of words (e.g. 120)"
            value={form.customWords}
            onChange={(e) => update("customWords", e.target.value)}
          />
        )}
      </div>

      {/* Generate button */}
      <Button
        type="submit"
        className="w-full"
        disabled={
          loading ||
          !form.topic ||
          !form.tone ||
          !form.lengthPreset
        }
      >
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  )
}
