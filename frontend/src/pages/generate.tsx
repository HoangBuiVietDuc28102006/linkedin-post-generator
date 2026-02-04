import * as React from "react"
import { PostGenerationForm } from "@/features/generator/post-generation-form"
import { PostGenerationResult } from "@/features/generator/output-results"

export default function GeneratePage() {
  const [result, setResult] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Generate LinkedIn Post
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <PostGenerationResult
          result={result}
          error={error}
        />
      </div>
    </div>
  )
}
