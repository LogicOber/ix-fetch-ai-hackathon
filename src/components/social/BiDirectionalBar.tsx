import { useEffect, useState } from "react";
import type { SocialMetrics } from "@/types/social";

interface BiDirectionalBarProps {
  type: "views" | "likes" | "reposts";
  positiveMetrics: SocialMetrics;
  negativeMetrics: SocialMetrics;
}

export function BiDirectionalBar({ type, positiveMetrics, negativeMetrics }: BiDirectionalBarProps) {
  const [mounted, setMounted] = useState(false);
  const positiveCurrent = positiveMetrics[type];
  const negativeCurrent = negativeMetrics[type];
  const total = Math.max(positiveCurrent + negativeCurrent, 1);
  
  const positiveWidth = (positiveCurrent / total) * 100;
  const negativeWidth = (negativeCurrent / total) * 100;

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [type, positiveMetrics, negativeMetrics]);

  return (
    <div className="relative h-24">
      {/* Background grid */}
      <div className="absolute inset-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="border-l border-gray-100 first:border-l-0 last:border-r" />
        ))}
      </div>

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-3 py-1 bg-white border border-primary/20 rounded-lg shadow-sm z-10">
          <span className="text-sm font-medium text-primary/80">
            {getLabel()}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center">
        {/* Left side (Positive) */}
        <div className="w-1/2 flex justify-end items-center pr-2">
          <span className="text-base font-semibold text-green-600 mr-3 min-w-[80px] text-right">
            {formatNumber(positiveCurrent)}
          </span>
          <div 
            className="h-12 bg-green-500/20 border-2 border-green-500 rounded-l-xl transition-all duration-500 ease-out"
            style={{ width: mounted ? `${positiveWidth / 2}%` : '0%' }}
          />
        </div>

        {/* Right side (Negative) */}
        <div className="w-1/2 flex items-center pl-2">
          <div 
            className="h-12 bg-red-500/20 border-2 border-red-500 rounded-r-xl transition-all duration-500 ease-out"
            style={{ width: mounted ? `${negativeWidth / 2}%` : '0%' }}
          />
          <span className="text-base font-semibold text-red-600 ml-3 min-w-[80px]">
            {formatNumber(negativeCurrent)}
          </span>
        </div>
      </div>
    </div>
  );
}