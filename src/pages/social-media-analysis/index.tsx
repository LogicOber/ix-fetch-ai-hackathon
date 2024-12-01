import { useState } from 'react';
import { TimeRangeSelector } from '@/components/social/TimeRangeSelector';
import { BiDirectionalBar } from '@/components/social/BiDirectionalBar';
import { UserList } from '@/components/social/UserList';
import { TimeSeriesChart } from '@/components/social/TimeSeriesChart';
import { mockSocialData } from '@/lib/mock-social-data';
import { BarChart2 } from 'lucide-react';
import type { TimeRange } from '@/types/social';

export default function SocialMediaAnalysis() {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');

  const positiveUsers = mockSocialData.users
    .filter(user => user.sentiment === 'positive')
    .sort((a, b) => b.influenceScore - a.influenceScore);
  
  const negativeUsers = mockSocialData.users
    .filter(user => user.sentiment === 'negative')
    .sort((a, b) => b.influenceScore - a.influenceScore);

  return (
    <div className="min-h-screen">
      <header className="border-b border-primary/20">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart2 className="h-7 w-7 text-primary" />
              <h1 className="text-2xl font-bold">Social Media Analysis</h1>
            </div>
            <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="space-y-12">
          {/* Metrics Section */}
          <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-lg font-semibold text-green-600">Positive Sentiment</h2>
              <h3 className="text-base font-medium text-primary">
                Total {timeRange === 'day' ? 'Daily' : timeRange === 'week' ? 'Weekly' : 'Monthly'} Metrics
              </h3>
              <h2 className="text-lg font-semibold text-red-600">Negative Sentiment</h2>
            </div>
            
            {timeRange === 'day' ? (
              <div className="space-y-8 rounded-xl border-2 border-primary/30 p-6">
                <BiDirectionalBar 
                  type="views" 
                  positiveMetrics={mockSocialData.metrics.positive}
                  negativeMetrics={mockSocialData.metrics.negative}
                />
                <BiDirectionalBar 
                  type="likes" 
                  positiveMetrics={mockSocialData.metrics.positive}
                  negativeMetrics={mockSocialData.metrics.negative}
                />
                <BiDirectionalBar 
                  type="reposts" 
                  positiveMetrics={mockSocialData.metrics.positive}
                  negativeMetrics={mockSocialData.metrics.negative}
                />
              </div>
            ) : (
              <TimeSeriesChart 
                data={mockSocialData.timeSeries[timeRange]} 
                timeRange={timeRange}
              />
            )}
          </div>

          {/* Users Section */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-green-600 px-4">Top Positive Influencers</h2>
              <UserList users={positiveUsers} />
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-red-600 px-4">Top Negative Influencers</h2>
              <UserList users={negativeUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}