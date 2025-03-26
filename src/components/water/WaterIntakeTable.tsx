
import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { WaterIntakeEntry } from '@/hooks/water/useWaterIntakeHistory';

interface WaterIntakeTableProps {
  entries: WaterIntakeEntry[];
}

const WaterIntakeTable: React.FC<WaterIntakeTableProps> = ({ entries }) => {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy h:mm a');
  };
  
  return (
    <div className="overflow-x-auto">
      <Table className="text-gray-200">
        <TableHeader className="bg-white/5">
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} className="border-t border-white/10">
              <TableCell>{formatDateTime(entry.created_at)}</TableCell>
              <TableCell>
                {entry.amount_ml >= 1000 
                  ? `${(entry.amount_ml / 1000).toFixed(1)}L` 
                  : `${entry.amount_ml}ml`}
              </TableCell>
              <TableCell className="text-gray-400">{entry.notes || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaterIntakeTable;
