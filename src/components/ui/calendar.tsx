import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={false}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center h-10",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center absolute left-1 right-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7 gap-0",
        head_cell: "text-muted-foreground font-normal text-[0.8rem] text-center",
        row: "grid grid-cols-7 gap-0 my-2",
        cell: cn(
          "relative p-[2px] text-center text-sm",
          "[&:has([aria-selected])]:bg-primary hover:[&:has([aria-selected])]:bg-primary"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 font-normal aria-selected:opacity-100 mx-auto",
          "[&[aria-selected]]:text-primary-foreground hover:[&[aria-selected]]:text-primary-foreground",
          "[&:not([aria-selected]):hover]:bg-accent [&:not([aria-selected]):hover]:text-accent-foreground",
          "[&[data-selection-start]]:rounded-l-full [&[data-selection-end]]:rounded-r-full",
          "[&[data-selection-start]]:rounded-r-none [&[data-selection-end]]:rounded-l-none"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground hover:bg-accent hover:text-primary-foreground focus:text-primary-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-primary aria-selected:text-primary-foreground hover:text-primary-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
