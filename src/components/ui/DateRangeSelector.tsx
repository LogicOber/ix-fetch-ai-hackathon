import { format, startOfDay, endOfDay, startOfMonth, endOfMonth, subDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { memo, useCallback } from 'react';
import './calendar.css';

export type { DateRange } from 'react-day-picker';

interface DateRangeSelectorProps {
  date: DateRange | undefined;
  onSelect: (date: DateRange | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
}

const presetRanges = [
  { 
    label: 'Today', 
    value: () => ({ 
      from: startOfDay(new Date()), 
      to: endOfDay(new Date()) 
    })
  },
  { 
    label: 'Last 7 Days', 
    value: () => ({ 
      from: subDays(startOfDay(new Date()), 6), 
      to: endOfDay(new Date()) 
    })
  },
  { 
    label: 'Last 30 Days', 
    value: () => ({ 
      from: subDays(startOfDay(new Date()), 29), 
      to: endOfDay(new Date()) 
    })
  },
  { 
    label: 'This Month', 
    value: () => ({ 
      from: startOfMonth(new Date()), 
      to: endOfMonth(new Date()) 
    })
  },
];

export const DateRangeSelector = memo(({ 
  date, 
  onSelect,
  minDate,
  maxDate 
}: DateRangeSelectorProps) => {
  const handleClear = useCallback(() => {
    onSelect(undefined);
  }, [onSelect]);

  const formatDate = useCallback((date: Date) => {
    return format(date, "MMM d, yyyy");
  }, []);

  const handlePresetSelect = useCallback((preset: typeof presetRanges[0]) => {
    onSelect(preset.value());
  }, [onSelect]);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "min-w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            aria-label="Select date range"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          sideOffset={5}
          role="dialog"
          aria-label="Date range selector"
        >
          <div className="space-y-4 p-4">
            {/* Preset Ranges */}
            <div className="grid grid-cols-4 gap-2">
              {presetRanges.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetSelect(preset)}
                  className="h-8 w-full text-xs font-medium"
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Date Range Display */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border bg-muted/20 p-3">
              <div>
                <div className="text-xs text-muted-foreground">From</div>
                <div className="mt-1 font-medium">
                  {date?.from ? formatDate(date.from) : "Pick start date"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">To</div>
                <div className="mt-1 font-medium">
                  {date?.to ? formatDate(date.to) : "Pick end date"}
                </div>
              </div>
            </div>

            {/* Selection Status */}
            {date?.from && !date.to && (
              <div className="rounded-md bg-primary/10 p-2 text-xs font-medium text-primary">
                Now select the end date
              </div>
            )}

            {/* Calendar */}
            <div className="rounded-md border">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={onSelect}
                numberOfMonths={1}
                showOutsideDays={false}
                fromDate={minDate}
                toDate={maxDate}
                fixedWeeks
                showWeekNumber
                className="w-full"
              />
            </div>

            {/* Clear Button */}
            {date && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Clear dates
                </Button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangeSelector.displayName = 'DateRangeSelector';
