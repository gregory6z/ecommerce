import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingDisplayProps {
  value: number
  max?: number
  className?: string
}

export function RatingDisplay({ value, max = 1, className }: RatingDisplayProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            index < value 
              ? "fill-primary text-primary" 
              : "text-muted-foreground"
          )}
        />
      ))}
    </div>
  )
}
