"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"

import { EventCategory } from "@prisma/client"

import { EmptyCategoryState } from "./empty-category-state"

interface CategoryPageContentProps {
  hasEvents: boolean
  category: EventCategory
}

export const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {
  const { data: pollingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"], // if the hash of the query key differs, the query is invalidated and refetched
    initialData: { hasEvents: initialHasEvents }, // we are polling the backend in an empty state
  }) // it doesn't not have queryFn because we are using this as a state

  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />
  }

  return <div>CategoryPageContent</div>
}
