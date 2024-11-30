import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SocialUser } from "@/types/social";

interface UserListProps {
  users: SocialUser[];
  type: "positive" | "negative";
}

export function UserList({ users, type }: UserListProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="grid grid-cols-[1fr_1fr_100px] gap-4 text-sm font-medium text-gray-500">
          <span>Name</span>
          <span>Handle</span>
          <span className="text-right">Score</span>
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {users.map((user) => (
              <TooltipProvider key={user.handle}>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div 
                      className="grid grid-cols-[1fr_1fr_100px] gap-4 items-center py-2 px-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <span className="font-medium">{user.name}</span>
                      <span className="text-primary">{user.handle}</span>
                      <div className="text-right">
                        <span className={cn(
                          "font-medium",
                          type === "positive" ? "text-green-600" : "text-red-600"
                        )}>
                          {user.influenceScore}/100
                        </span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className={cn(
                      "bg-white border-2 p-4 rounded-2xl shadow-lg w-[340px] relative",
                      user.sentiment === 'positive' ? "border-emerald-500/50" : "border-red-500/50"
                    )}
                    sideOffset={5}
                  >
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-gray-900">{user.name}</span>
                            <span className="text-gray-500">@{user.handle}</span>
                          </div>
                          <svg 
                            className="w-4 h-4 text-gray-400" 
                            shape-rendering="geometricPrecision" 
                            text-rendering="geometricPrecision" 
                            image-rendering="optimizeQuality" 
                            fill-rule="evenodd" 
                            clip-rule="evenodd" 
                            viewBox="0 0 512 509.64"
                          >
                            <rect width="512" height="509.64" rx="115.61" ry="115.61"/>
                            <path fill="#fff" fill-rule="nonzero" d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"/>
                          </svg>
                        </div>
                        <p className="text-base text-gray-900 leading-normal mt-1.5 text-left">
                          {user.tweets[0]?.content || 'No tweets available'}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
                            </svg>
                            <span className="text-sm text-gray-500">{user.tweets[0]?.metrics.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm-4.647 7.22c-.088.06-.177.118-.266.175l-.07.047-.07-.047c-.088-.057-.177-.115-.265-.175-3.526-2.314-5.135-4.27-5.332-5.862-.138-1.116.306-1.756.665-2.05.34-.27.707-.4 1.127-.42.893-.04 1.866.39 2.61 1.395l1.265 1.71 1.265-1.71c.744-1.005 1.717-1.435 2.61-1.395.42.02.786.15 1.127.42.36.294.803.934.665 2.05-.197 1.592-1.806 3.548-5.332 5.862z" />
                            </svg>
                            <span className="text-sm text-gray-500">{user.tweets[0]?.metrics.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
                            </svg>
                            <span className="text-sm text-gray-500">{user.tweets[0]?.metrics.reposts.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
}