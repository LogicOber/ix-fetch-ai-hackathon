import { useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { HESITANCY_COLORS } from '@/lib/constants';
import type { TimeSeriesData } from '@/types/health';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const totalCases = payload.find(p => p.name === 'Total Cases')?.value || 0;
      const deaths = payload.find(p => p.name === 'Deaths')?.value || 0;
      const hesitancyValues = {
        Low: payload.find(p => p.dataKey === 'Low')?.value || 0,
        Moderate: payload.find(p => p.dataKey === 'Moderate')?.value || 0,
        High: payload.find(p => p.dataKey === 'High')?.value || 0,
        Severe: payload.find(p => p.dataKey === 'Severe')?.value || 0,
      };

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-2 mb-3">
            <p className="text-sm">Total Cases: {totalCases.toLocaleString()}</p>
            <p className="text-sm text-red-600">Deaths: {deaths.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Hesitancy Breakdown:</p>
            {Object.entries(hesitancyValues).map(([level, value]) => (
              <div key={level} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: HESITANCY_COLORS[level as keyof typeof HESITANCY_COLORS] }}
                  />
                  <span>{level}:</span>
                </div>
                <div className="flex gap-2">
                  <span>{value.toLocaleString()}</span>
                  <span className="text-gray-500">
                    ({Math.round((value / totalCases) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full h-[600px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={formattedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fontSize: 12 }}
            height={50}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12 }}
            width={60}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {Object.entries(HESITANCY_COLORS).map(([level, color]) => (
            <Bar
              key={level}
              yAxisId="left"
              dataKey={level}
              stackId="hesitancy"
              fill={color}
              name={level}
            />
          ))}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="newCases"
            stroke="#2563eb"
            strokeWidth={2}
            name="Total Cases"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="deaths"
            stroke="#ef4444"
            strokeWidth={2}
            name="Deaths"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
}