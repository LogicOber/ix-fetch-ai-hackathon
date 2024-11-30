import { Sidebar } from "./Sidebar";
import { ChatWidget } from "../chat/ChatWidget";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 ml-60">
        {children}
      </main>
      <ChatWidget />
    </div>
  );
}