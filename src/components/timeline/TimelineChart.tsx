
import React, { useState } from 'react';
import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { format } from 'date-fns';
import { Droplet, Moon, Smile, Activity } from 'lucide-react';
import { TimelineDataPoint } from '@/types/timeline';

interface TimelineChartProps {
  data: TimelineDataPoint[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ data }) => {
  const [activeMetrics, setActiveMetrics] = useState({
    hydration: true,
    sleep: true,
    mood: true,
    movement: true
  });

  const toggleMetric = (metric: keyof typeof activeMetrics) => {
    setActiveMetrics(prev => ({
      ...prev,
      [metric]: !prev[metric]
    }));
  };

  // Transform data for the chart
  const chartData = data.map(point => ({
    date: format(new Date(point.date), 'MMM dd'),
    hydration: point.hydration ? point.hydration / 10 : null, // Normalize to 0-10 scale
    sleep: point.sleep,
    mood: point.mood,
    movement: point.movement ? point.movement / 60 : null, // Convert minutes to hours
  }));

  return (
    <div className="mb-8">
      <h3 className="text-xl font-display font-semibold mb-4">Your Wellness Timeline</h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <button 
          onClick={() => toggleMetric('hydration')} 
          className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
            activeMetrics.hydration ? 'bg-supernova-blue/20 text-supernova-blue' : 'bg-white/5 text-gray-400'
          }`}
        >
          <Droplet size={14} className="mr-1" /> Hydration
        </button>
        <button 
          onClick={() => toggleMetric('sleep')} 
          className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
            activeMetrics.sleep ? 'bg-supernova-purple/20 text-supernova-purple' : 'bg-white/5 text-gray-400'
          }`}
        >
          <Moon size={14} className="mr-1" /> Sleep
        </button>
        <button 
          onClick={() => toggleMetric('mood')} 
          className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
            activeMetrics.mood ? 'bg-supernova-pink/20 text-supernova-pink' : 'bg-white/5 text-gray-400'
          }`}
        >
          <Smile size={14} className="mr-1" /> Mood
        </button>
        <button 
          onClick={() => toggleMetric('movement')} 
          className={`flex items-center px-3 py-1.5 rounded-full text-sm ${
            activeMetrics.movement ? 'bg-supernova-gold/20 text-supernova-gold' : 'bg-white/5 text-gray-400'
          }`}
        >
          <Activity size={14} className="mr-1" /> Movement
        </button>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#444' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#444' }}
              label={{ value: 'Value', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Legend />
            
            {activeMetrics.hydration && (
              <Line 
                type="monotone" 
                dataKey="hydration" 
                name="Hydration (L)" 
                stroke="#4FEAFF" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
                connectNulls 
              />
            )}
            
            {activeMetrics.sleep && (
              <Line 
                type="monotone" 
                dataKey="sleep" 
                name="Sleep (hrs)" 
                stroke="#A78BFA" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
                connectNulls 
              />
            )}
            
            {activeMetrics.mood && (
              <Line 
                type="monotone" 
                dataKey="mood" 
                name="Mood (1-10)" 
                stroke="#EC4899" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
                connectNulls 
              />
            )}
            
            {activeMetrics.movement && (
              <Line 
                type="monotone" 
                dataKey="movement" 
                name="Activity (hrs)" 
                stroke="#F59E0B" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
                connectNulls 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-gray-400 text-sm mt-2 text-center">
        Here's your wellness timeline over the past 5 days. Notice any trends?
      </p>
    </div>
  );
};

export default TimelineChart;
