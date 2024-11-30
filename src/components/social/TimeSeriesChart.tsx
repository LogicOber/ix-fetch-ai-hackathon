import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from "@/components/ui/card";
import type { TimeSeriesMetrics, TimeRange } from '@/types/social';

interface TimeSeriesChartProps {
  data: TimeSeriesMetrics[];
  timeRange: TimeRange;
}

export function TimeSeriesChart({ data, timeRange }: TimeSeriesChartProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    switch (timeRange) {
      case 'week':
        return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' });
      case 'month':
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      default:
        return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const positiveValue = payload[0].value;
      const negativeValue = payload[1].value;
      const total = positiveValue + negativeValue;

      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-primary">
          <p className="font-medium text-primary mb-2">{formatDate(label)}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-green-600">Positive:</span>
              <span className="text-sm">{positiveValue.toLocaleString()} ({Math.round((positiveValue / total) * 100)}%)</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-red-600">Negative:</span>
              <span className="text-sm">{negativeValue.toLocaleString()} ({Math.round((negativeValue / total) * 100)}%)</span>
            </div>
            <div className="pt-2 border-t border-primary/20">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-primary">Total:</span>
                <span className="text-sm">{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={formatDate}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              domain={[0, 'dataMax']}
              label={{ 
                value: 'Total Interactions', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Percentage', 
                angle: 90, 
                position: 'insideRight',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="positive.percentage"
              stroke="#22c55e"
              strokeWidth={2}
              name="Positive"
              dot={false}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="negative.percentage"
              stroke="#ef4444"
              strokeWidth={2}
              name="Negative"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}