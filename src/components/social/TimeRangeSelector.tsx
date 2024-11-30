import { cn } from "@/lib/utils";
import type { TimeRange } from "@/types/social";

interface TimeRangeSelectorProps {
  selected: TimeRange;
  onChange: (range: TimeRange) => void;
}

export function TimeRangeSelector({ selected, onChange }: TimeRangeSelectorProps) {
  const ranges: TimeRange[] = ['day', 'week', 'month'];

  return (
    <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors",
            selected === range
              ? "bg-primary text-white"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
}