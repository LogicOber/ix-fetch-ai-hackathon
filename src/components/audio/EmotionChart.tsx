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

interface EmotionChartProps {
  data: EmotionPoint[];
  hesitationPoints?: EmotionPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: EmotionPoint;
  }[];
}

interface ScatterDotProps {
  cx?: number;
  cy?: number;
  r?: number;
  fill?: string;
  stroke?: string;
  payload?: EmotionPoint;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload[0]) return null;

  const data = payload[0].payload as EmotionPoint;
  const emotionScore = data.emotionScore.toFixed(2);
  const minutes = Math.floor(data.time / 60);
  const seconds = (data.time % 60).toString().padStart(2, '0');

  return (
    <div className="p-4 max-w-sm bg-white shadow-lg rounded-lg border border-gray-100">
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Time:</span> {minutes}:{seconds}
        </div>
        <div className="text-sm text-primary text-right">
          <span className="font-medium">Score:</span> {emotionScore}
        </div>
      </div>
      {data.isHesitancyPoint && (
        <>
          <p className="text-sm italic mb-2">"{data.speech}"</p>
          <div className="w-full h-px bg-gray-200 my-2" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold">AI Analysis:</span> {data.aiAnalysis}
          </p>
        </>
      )}
    </div>
  );
};

const CustomScatterDot = (props: ScatterDotProps) => {
  const { cx = 0, cy = 0, payload } = props;
  
  if (!payload?.isHesitancyPoint) {
    return null;
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#ef4444"
    />
  );
};

export function EmotionChart({ data, hesitationPoints = [] }: EmotionChartProps) {
  const chartData = useMemo(() => {
    return data.map(point => ({
      ...point,
      formattedTime: `${Math.floor(point.time / 60)}:${(point.time % 60).toString().padStart(2, '0')}`
    }));
  }, [data]);

  const hesitancyPointsFromData = useMemo(() => {
    return chartData.filter(point => point.isHesitancyPoint);
  }, [chartData]);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            type="number"
            domain={[0, 'auto']}
            tickFormatter={(value) => {
              const minutes = Math.floor(value / 60);
              const seconds = value % 60;
              return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }}
          />
          <YAxis domain={[-1, 1]} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#666" />
          <Line
            type="monotone"
            dataKey="emotionScore"
            stroke="#2563eb"
            dot={false}
            isAnimationActive={false}
          />
          {(hesitationPoints.length > 0 || hesitancyPointsFromData.length > 0) && (
            <Scatter
              data={hesitationPoints.length > 0 ? hesitationPoints : hesitancyPointsFromData}
              fill="#ef4444"
              shape={<CustomScatterDot />}
            />
          )}
          {hesitationPoints.map((point, index) => (
            <ReferenceLine
              key={`hesitation-${index}`}
              x={point.time}
              stroke="#ef4444"
              strokeDasharray="3 3"
              label={{
                position: 'top',
                value: '!',
                fill: '#ef4444',
                fontSize: 12
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
