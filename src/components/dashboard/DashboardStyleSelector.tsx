
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

export type DashboardStyle = 'minimalist' | 'coach' | 'data-rich' | 'journey';

interface DashboardStyleSelectorProps {
  value: DashboardStyle;
  onChange: (value: DashboardStyle) => void;
}

const DashboardStyleSelector: React.FC<DashboardStyleSelectorProps> = ({ 
  value, 
  onChange 
}) => {
  const { toast } = useToast();

  const handleChange = (newValue: string) => {
    try {
      onChange(newValue as DashboardStyle);
    } catch (error) {
      toast({
        title: "Style Change Failed",
        description: "Looks like your dashboard view didn't update. Try switching styles again. If nothing changes, refresh the page or use the default view.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Choose your dashboard style</label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="w-full bg-white/5 border-white/10 text-gray-200">
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="minimalist">Minimalist Mode</SelectItem>
          <SelectItem value="coach">Coach Mode</SelectItem>
          <SelectItem value="data-rich">Data-Rich Mode</SelectItem>
          <SelectItem value="journey">Journey Log</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardStyleSelector;
