import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Scatter
} from 'recharts';
import type { EmotionPoint } from '@/types/audio';
import { Card } from '@/components/ui/card';

interface EmotionChartProps {
  data: EmotionPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: EmotionPoint;
  }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload as EmotionPoint;
  if (!data.isHesitancyPoint) return null;

  return (
    <Card className="p-4 max-w-sm bg-white shadow-lg">
      <p className="text-sm italic mb-2">"{data.speech}"</p>
      <div className="w-full h-px bg-gray-200 my-2" />
      <p className="text-sm text-gray-600">
        <span className="font-semibold">AI Analysis:</span> {data.aiAnalysis}
      </p>
    </Card>
  );
};

export function EmotionChart({ data }: EmotionChartProps) {
  const chartData = useMemo(() => {
    return data.map(point => ({
      ...point,
      formattedTime: `${Math.floor(point.time / 60)}:${(point.time % 60).toString().padStart(2, '0')}`
    }));
  }, [data]);

  const hesitancyPoints = useMemo(() => {
    return data.filter(point => point.isHesitancyPoint);
  }, [data]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="formattedTime"
            label={{ value: 'Time', position: 'bottom' }}
          />
          <YAxis
            domain={[-1, 1]}
            ticks={[-1, -0.5, 0, 0.5, 1]}
            label={{ value: 'Emotion Score', angle: -90, position: 'left' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#666" />
          <Line
            type="monotone"
            dataKey="emotionScore"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Scatter
            data={hesitancyPoints}
            fill="#ef4444"
            shape="circle"
            dataKey="emotionScore"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
