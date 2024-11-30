import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { ChartTooltip } from './ChartTooltip';
import { HESITANCY_COLORS } from '@/lib/constants';
import type { TimeSeriesData } from '@/types/health';

interface StackedBarChartProps {
  data: TimeSeriesData[];
}

export function StackedBarChart({ data }: StackedBarChartProps) {
  const formattedData = useMemo(() => {
    return data.map(item => {
      const total = item.newCases;
      const breakdown = Object.entries(item.hesitancyBreakdown).reduce((acc, [level, percentage]) => {
        acc[level] = Math.round(total * (percentage / 100));
        return acc;
      }, {} as Record<string, number>);

      return {
        ...item,
        ...breakdown,
        date: new Date(item.date).toLocaleDateString('en-GB', {
          month: 'short',
          day: 'numeric'
        })
      };
    });
  }, [data]);

  return (
    <Card className="w-full h-[600px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
            height={50}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            width={60}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {Object.entries(HESITANCY_COLORS).map(([level, color]) => (
            <Bar
              key={level}
              dataKey={level}
              stackId="hesitancy"
              fill={color}
              name={level}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}