
import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import GlassMorphicCard from '../ui/GlassMorphicCard';

const activityData = [
  { day: 'Mon', steps: 5234 },
  { day: 'Tue', steps: 6521 },
  { day: 'Wed', steps: 4333 },
  { day: 'Thu', steps: 7842 },
  { day: 'Fri', steps: 6452 },
  { day: 'Sat', steps: 3245 },
  { day: 'Sun', steps: 4521 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/70 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-sm">
        <p className="font-display">{`${label} : ${payload[0].value.toLocaleString()} steps`}</p>
      </div>
    );
  }

  return null;
};

const ActivityTracker: React.FC = () => {
  return (
    <GlassMorphicCard className="p-6 w-full h-[300px]">
      <h3 className="text-lg font-display font-semibold mb-4">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            domain={[0, 10000]}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="stepColorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4FEAFF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4FEAFF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Line 
            type="monotone" 
            dataKey="steps" 
            stroke="#4FEAFF" 
            activeDot={{ r: 8, fill: '#4FEAFF', strokeWidth: 2 }}
            strokeWidth={2}
            dot={{ r: 4, fill: '#111827', strokeWidth: 2, stroke: '#4FEAFF' }}
            fillOpacity={1} 
            fill="url(#stepColorGradient)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassMorphicCard>
  );
};

export default ActivityTracker;
