import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface PingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string
}


export function PingButton({ children, className, ...props }: PingButtonProps) {
  return (
    <Button
    {...props}
      variant="rounded"
      size="iconSm"
      className={cn(
        "relative  top-2 left-2 inline-flex items-center justify-center",
        className
      )}
    >
      <span className="animate-[ping_3s_ease-in-out_infinite] absolute -inset-0.5 h-[calc(100%+4px)] w-[calc(100%+4px)] rounded-full bg-zinc-600 opacity-50 pointer-events-none z-0" />
      <span className="relative z-10">
        {children}
      </span>
    </Button>
  )
}