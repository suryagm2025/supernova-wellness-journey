
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WaterIntakeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const WaterIntakeFilter: React.FC<WaterIntakeFilterProps> = ({ value, onChange }) => {
  return (
    <div className="min-w-32">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/5 border-white/10">
          <SelectValue placeholder="Filter by time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 7 days</SelectItem>
          <SelectItem value="month">Last 30 days</SelectItem>
          <SelectItem value="all">All time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WaterIntakeFilter;
