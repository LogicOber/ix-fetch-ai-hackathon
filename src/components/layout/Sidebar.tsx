import { Activity, BarChart2, History, Settings, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from 'lucide-react';

type NavigationItem = {
  name: string;
  href?: string;
  icon?: LucideIcon;
  type?: 'divider';
};

const navigation: NavigationItem[] = [
  { type: "divider", name: "AI Analysis Dashboard" },
  { name: "Health Board", href: "/health-board", icon: Activity },
  { name: "Social Media Analysis", href: "/social-media-analysis", icon: BarChart2 },
  { type: "divider", name: "AI Sentiment Tools" },
  { name: "Audio Emotion Analysis", href: "/audio-emotion", icon: Mic },
  { name: "Analysis History", href: "/story-strategy", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-full bg-white border-r">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b w-full">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">NHS Monitor</span>
          </div>
        </div>
        <nav className="flex-1 p-2">
          {navigation.map((item, index) => {
            if (item.type === "divider") {
              return (
                <div key={index} className="flex items-center px-4 py-3 text-base font-bold text-blue-600">
                  {item.name}
                </div>
              );
            }

            if (item.href && item.icon) {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg mb-1 w-full",
                    location.pathname === item.href
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-primary/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            }
            return null;
          })}
        </nav>
      </div>
    </aside>
  );
}