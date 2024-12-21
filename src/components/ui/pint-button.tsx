import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export function PingButton({ 
  children, 
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      variant="rounded"
      size="iconSm"
      className={cn(
        "relative top-2 left-2 inline-flex z-10 items-center justify-center",
        className
      )}
    >
      <span className="animate-[ping_3s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-white/50" />
      <span className="relative  ">
        {children}
      </span>
    </Button>
  )
}