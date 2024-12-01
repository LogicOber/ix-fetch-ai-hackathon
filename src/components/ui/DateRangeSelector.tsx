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
      {date && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs font-medium text-muted-foreground hover:text-primary-foreground"
          onClick={handleClear}
        >
          Clear
        </Button>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal hover:text-primary-foreground",
              !date && "text-muted-foreground"
            )}
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
          className="w-fit p-0"
          align="end"
          alignOffset={0}
          sideOffset={5}
          role="dialog"
          aria-label="Date range selector"
        >
          <div className="p-4 w-[280px]">
            {/* Preset Ranges */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presetRanges.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePresetSelect(preset)}
                  className="h-8 text-xs font-medium hover:text-white"
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Date Range Display */}
            <div className="flex flex-col gap-4 mb-4">
              <div className="rounded-lg border bg-muted/20 p-3">
                <div className="text-xs text-muted-foreground">From</div>
                <div className="mt-1 font-medium">
                  {date?.from ? formatDate(date.from) : "Pick start date"}
                </div>
              </div>
              <div className="rounded-lg border bg-muted/20 p-3">
                <div className="text-xs text-muted-foreground">To</div>
                <div className="mt-1 font-medium">
                  {date?.to ? formatDate(date.to) : "Pick end date"}
                </div>
              </div>
            </div>

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
                className="block"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateRangeSelector.displayName = 'DateRangeSelector';
