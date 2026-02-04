import { useState } from "react"
import { Button } from "@/components/ui/button"

interface PostGenerationResultProps {
    result: string
    error: string
}

export function PostGenerationResult({
    result,
    error,
}: PostGenerationResultProps) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        if (!result) return


        await navigator.clipboard.writeText(result)
        setCopied(true)

        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="relative flex h-[60vh] flex-col rounded-md border border-zinc-800 bg-zinc-900 p-4">
            <h2 className="mb-3 text-sm font-semibold text-white">
                Generated Result
            </h2>

            <div className="flex-1 overflow-y-auto pr-2">
                {!result && !error && (
                    <p className="text-sm text-zinc-500">
                        Your generated LinkedIn post will appear here.
                    </p>
                )}

                {error && (
                    <div className="rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                {result && (
                    <pre className="whitespace-pre-wrap text-sm text-zinc-200">
                        {result}
                    </pre>
                )}
            </div>

            <div className="absolute bottom-4 right-4">
                <Button
                    type="button"
                    disabled={!result}
                    variant="primary"
                    onClick={handleCopy}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
        </div>
    )
}
