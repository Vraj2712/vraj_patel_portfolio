"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  /** Currently active item's `url`. Fully controlled — drive this from
   *  a click handler and/or a scroll-spy observer in the parent. */
  activeUrl: string
  /** Called with an item's `url` the instant it's clicked, so the
   *  parent can update the active state optimistically before the
   *  browser finishes scrolling to the anchor. */
  onItemSelect?: (url: string) => void
  className?: string
}

/**
 * Tubelight Navbar — a glass pill nav where the active tab gets a
 * glowing "lamp" indicator that slides between tabs via Framer
 * Motion's shared layoutId animation. Faithful recreation of the
 * ayushmxxn/Serenity UI "tubelight-navbar" component (21st.dev),
 * adapted to be a controlled component wired to this site's own
 * theme tokens, icon set, and scroll-spy.
 */
export function NavBar({ items, activeUrl, onItemSelect, className }: NavBarProps) {
  return (
    <div className={cn("flex items-center gap-px rounded-full border border-border/70 bg-muted p-1 shadow-sm sm:gap-1", className)}>
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeUrl === item.url

        return (
          <a
            key={item.name}
            href={item.url}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onItemSelect?.(item.url)}
            className={cn(
              "relative flex cursor-pointer items-center justify-center rounded-full px-1.5 py-2 text-sm font-medium transition-colors duration-200",
              "text-muted-foreground hover:text-foreground",
              "outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive && "text-foreground",
              "sm:px-3 md:px-4"
            )}
          >
            <span className="hidden md:inline">{item.name}</span>
            <span className="md:hidden">
              <Icon size={16} strokeWidth={2.25} aria-hidden />
              <span className="sr-only">{item.name}</span>
            </span>

            {isActive && (
              <motion.div
                layoutId="tubelight-lamp"
                className="absolute inset-0 -z-10 rounded-full bg-muted"
                initial={false}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-brand">
                  <div className="absolute -top-2 -left-2 h-6 w-14 rounded-full bg-brand/40 blur-md" />
                  <div className="absolute -top-1 left-1 h-6 w-8 rounded-full bg-brand/40 blur-md" />
                  <div className="absolute top-0 left-3 h-4 w-4 rounded-full bg-brand/40 blur-sm" />
                </div>
              </motion.div>
            )}
          </a>
        )
      })}
    </div>
  )
}
