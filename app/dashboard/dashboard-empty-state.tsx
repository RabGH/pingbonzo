import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient()

  const { mutate: insetQuickStartCategories } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickStartCategories.$post
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
    },
    onError: () => {
      console.log("failed to seed categories")
    },
  })

  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      <div className="flex justify-center w-full">
        <Image
          src="/brand-asset-wave.png"
          alt="no categories"
          className="size-48 -mt-24"
          width={192}
          height={192}
        />
      </div>
    </Card>
  )
}
