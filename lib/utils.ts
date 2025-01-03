import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createId } from "@paralleldrive/cuid2"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseColor = (color: string) => {
  const hex = color.startsWith("#") ? color.slice(1) : color
  return parseInt(hex, 16)
}

/**
 * Generates a randomly generated cuid string.
 * @returns {string} A unique identifier.
 */
export const generateCuid = (): string => {
  return createId()
}
