"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

// Type fixes pour React 19/Tailwind v4 - Version simplifiée temporaire
const ChartContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-[200px] w-full", className)}
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card p-2 shadow-md", className)}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    active?: boolean
    payload?: Array<{ name: string; value: unknown; [key: string]: unknown }>
    label?: string
    indicator?: string
    hideLabel?: boolean
    hideIndicator?: boolean
    labelFormatter?: (value: unknown) => string
    labelClassName?: string
    formatter?: (value: unknown) => string
  }
>(({ className, active, payload, label, ...props }, ref) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border bg-card p-2 shadow-md", className)}
      {...props}
    >
      {label && <div className="font-medium">{label}</div>}
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-sm">{item.name}: {String(item.value)}</span>
        </div>
      ))}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    payload?: Array<{ value: string; color: string; [key: string]: unknown }>
    verticalAlign?: string
  }
>(({ className, payload, ...props }, ref) => {
  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap justify-center gap-4", className)}
      {...props}
    >
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm">{item.value}</span>
        </div>
      ))}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = ChartLegend

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}