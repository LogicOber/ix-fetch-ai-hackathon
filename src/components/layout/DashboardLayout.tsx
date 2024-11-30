import { Sidebar } from "./Sidebar";
import { ChatWidget } from "../chat/ChatWidget";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <div className="fixed inset-y-0 left-0 w-60 z-50">
        <Sidebar />
      </div>
      <div className="flex-1 ml-60">
        <main className="h-full w-full overflow-auto p-6">
          {children}
        </main>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ChatWidget />
      </div>
    </div>
  )
}