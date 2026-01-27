import * as React from "react"
import { PostGenerationForm } from "@/features/generator/post-generation-form"

export default function GeneratePage() {
  const [result, setResult] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Generate LinkedIn Post
      </h1>

      <PostGenerationForm
        onGenerated={(text) => {
          setError("")
          setResult(text)
        }}
        onError={(msg) => {
          setResult("")
          setError(msg)
        }}
      />

      {error && (
        <div className="mt-6 rounded-md border border-red-900 bg-red-950 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-md border border-zinc-800 bg-zinc-900 p-4">
          <div className="mb-2 text-sm font-semibold text-white">Result</div>
          <pre className="whitespace-pre-wrap text-sm text-zinc-200">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}
