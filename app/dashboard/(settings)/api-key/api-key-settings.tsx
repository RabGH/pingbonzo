"use client"

import React from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  CheckIcon,
  ClipboardIcon,
  RefreshCwIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { generateCuid } from "@/lib/utils"
// { apiKey: initialApiKey }: { apiKey: string }
const ApiKeySettings = () => {
  const [copySuccess, setCopySuccess] = React.useState(false)
  const [isApiKeyVisible, setIsApiKeyVisible] = React.useState(false)

  const queryClient = useQueryClient()
  const newApiKey = generateCuid()

  // Fetch the user's API key
  const { data: apiKey, isFetching } = useQuery({
    queryKey: ["user-api-key"],
    queryFn: async () => {
      const res = await client.project.getUserApiKey.$get()
      const data = await res.json()
      return data.apiKey
    },
  })
  const [currentApiKey, setCurrentApiKey] = React.useState<string>(apiKey || "")

  const { mutate: regenerateApiKey, isPending } = useMutation({
    mutationFn: async (apiKey: string) => {
      const res = await client.project.setApiKey.$post({ apiKey })
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-api-key"] })
    },
  })

  const copyApiKey = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(currentApiKey)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } else {
      console.error("Clipboard API is not available")
    }
  }

  const toggleApiKeyVisibility = () => {
    setIsApiKeyVisible((prev) => !prev)
  }

  return (
    <Card className="max-w-xl w-full">
      <div>
        <Label>Your API Key</Label>
        <div className="mt-1 relative">
          <Input
            type={"text"}
            value={
              isFetching
                ? "Loading..."
                : isApiKeyVisible
                  ? apiKey || ""
                  : (apiKey || "").replace(/./g, "•")
            }
            readOnly
          />
          <div className="absolute space-x-0.5 inset-y-0 right-1 flex items-center">
            <Button
              variant={"ghost"}
              onClick={copyApiKey}
              className="p-1 w-10 h-8 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-brand-900" />
              ) : (
                <ClipboardIcon className="size-4 text-brand-900" />
              )}
            </Button>
            <Button
              variant={"ghost"}
              onClick={toggleApiKeyVisibility}
              className="p-1 w-10 h-8 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {isApiKeyVisible ? (
                <EyeOffIcon className="size-4 text-brand-900" />
              ) : (
                <EyeIcon className="size-4 text-brand-900" />
              )}
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => regenerateApiKey(newApiKey)}
              disabled={isPending}
              className="p-1 w-10 h-8 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {isPending ? (
                <RefreshCwIcon className="size-4 text-brand-900 animate-spin" />
              ) : (
                <RefreshCwIcon className="size-4 text-brand-900" />
              )}
            </Button>
          </div>
        </div>

        <p className="mt-2 text-sm/6 text-gray-600">
          Keep your key secret and do not share it with others.
        </p>
      </div>
    </Card>
  )
}

export default ApiKeySettings
