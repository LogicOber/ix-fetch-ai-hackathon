import { LayoutDashboard, BarChart2, Mic, History, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import modernaLogo from '@/assets/images/moderna-logo.png';

type NavigationItem = {
  name: string;
  href?: string;
  icon?: LucideIcon;
  type?: 'divider';
};

const navigation: NavigationItem[] = [
  { type: "divider", name: "AI Analysis Dashboard" },
  { name: "Health Board", href: "/health-board", icon: LayoutDashboard },
  { name: "Social Media Analysis", href: "/social-media-analysis", icon: BarChart2 },
  { type: "divider", name: "AI Journey Mapping" },
  { name: "Record Mapping", href: "/audio-emotion", icon: Mic },
  { name: "Mapping History", href: "/analysis-history", icon: History },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col h-full bg-white border-r">
      <div className="p-6 border-b w-full">
        <div className="flex items-center gap-3">
          <img src={modernaLogo} alt="Moderna" className="h-12 w-12 object-contain" />
          <span className="font-semibold text-xl">Moderna AI</span>
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
                  "flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                  location.pathname === item.href && "bg-gray-100 text-blue-600 font-medium"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          }
        })}
      </nav>
      <div className="mt-auto border-t">
        <UserProfile />
      </div>
    </aside>
  );
}