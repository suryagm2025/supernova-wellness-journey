
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';

interface MoodChartProps {
  moodData: Array<{
    date: string;
    mood: number;
  }>;
  isLoading: boolean;
}

const MoodChart: React.FC<MoodChartProps> = ({ moodData, isLoading }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">Mood Trend (Mon-Sun)</h3>
      <div className="h-[250px] w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <span>Loading data...</span>
          </div>
        ) : (
          <ChartContainer 
            className="h-full w-full" 
            config={{
              mood: { color: "#FF6B95" }
            }}
          >
            <LineChart data={moodData}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { weekday: 'short' });
                }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                domain={[0, 10]}
              />
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="var(--color-mood)" 
                strokeWidth={2}
                dot={{ r: 4, fill: '#111827', strokeWidth: 2, stroke: "var(--color-mood)" }}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent 
                        payload={payload} 
                        formatter={(value, name) => {
                          // Check if value is a number before using toFixed
                          const numericValue = typeof value === 'number' ? value : parseFloat(String(value));
                          return (
                            <span>{!isNaN(numericValue) ? numericValue.toFixed(1) : value}/10</span>
                          );
                        }}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'short', 
                            day: 'numeric' 
                          });
                        }}
                      />
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
};

export default MoodChart;
