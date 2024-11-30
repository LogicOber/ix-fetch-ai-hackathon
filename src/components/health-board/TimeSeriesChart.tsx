import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TimeSeriesData } from "@/types/health";

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <Card className="w-full h-[600px] rounded-xl overflow-hidden border-[1.5px] border-primary/30">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-GB', { 
              month: 'short', 
              day: 'numeric' 
            })}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="newCases" fill="#93c5fd" name="New Cases" />
          <Bar dataKey="sevenDayAverage" fill="#2563eb" name="7 Day Average" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}