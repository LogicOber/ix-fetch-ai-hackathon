import { cn } from "@/lib/utils";
import type { SocialMetrics } from "@/types/social";

interface MetricsBarProps {
  type: "views" | "likes" | "reposts";
  positiveMetrics: SocialMetrics;
  negativeMetrics: SocialMetrics;
  className?: string;
}

export function MetricsBar({ type, positiveMetrics, negativeMetrics, className }: MetricsBarProps) {
  const positiveCurrent = positiveMetrics[type];
  const negativeCurrent = negativeMetrics[type];
  const total = positiveCurrent + negativeCurrent;
  
  // Calculate percentages for bar widths
  const positiveWidth = Math.round((positiveCurrent / total) * 100);
  const negativeWidth = Math.round((negativeCurrent / total) * 100);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getLabel = () => {
    switch(type) {
      case "views": return "Total Views";
      case "likes": return "Total Likes";
      case "reposts": return "Total Reposts";
    }
  };

  return (
    <div className={cn("flex items-center h-16 relative", className)}>
      {/* Grid lines */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 border-l border-gray-100 first:border-l-0"
          />
        ))}
      </div>

      {/* Center line */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-px h-full bg-gray-300" />
      </div>

      {/* Center label */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-10">
        <span className="text-sm font-medium text-gray-600 bg-white px-3">
          {getLabel()}
        </span>
      </div>

      {/* Bars */}
      <div className="flex w-full">
        {/* Left side (Positive) */}
        <div className="w-1/2 flex justify-end items-center pr-2">
          <span className="text-sm font-medium text-green-600 mr-2">
            {formatNumber(positiveCurrent)}
          </span>
          <div 
            className="h-10 bg-green-100 rounded-l-md border border-green-200"
            style={{ width: `${positiveWidth}%` }}
          />
        </div>

        {/* Right side (Negative) */}
        <div className="w-1/2 flex items-center pl-2">
          <div 
            className="h-10 bg-red-100 rounded-r-md border border-red-200"
            style={{ width: `${negativeWidth}%` }}
          />
          <span className="text-sm font-medium text-red-600 ml-2">
            {formatNumber(negativeCurrent)}
          </span>
        </div>
      </div>
    </div>
  );
}