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