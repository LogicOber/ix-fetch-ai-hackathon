import { HESITANCY_COLORS } from '@/lib/constants';

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: keyof typeof HESITANCY_COLORS;
    value: number;
  }>;
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const totalCases = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold mb-2">{label}</p>
      <p className="text-sm mb-2">Total Cases: {totalCases.toLocaleString()}</p>
      <div className="space-y-1">
        <p className="text-sm font-medium">Hesitancy Breakdown:</p>
        {payload.map(entry => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: HESITANCY_COLORS[entry.dataKey] }}
              />
              <span>{entry.dataKey}:</span>
            </div>
            <div className="flex gap-2">
              <span>{entry.value.toLocaleString()}</span>
              <span className="text-gray-500">
                ({Math.round((entry.value / totalCases) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}