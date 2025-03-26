
import React, { useState } from 'react';
import { useWaterIntakeHistory } from '@/hooks/water/useWaterIntakeHistory';
import WaterIntakeFilter from './WaterIntakeFilter';
import WaterIntakeTable from './WaterIntakeTable';
import WaterIntakePagination from './WaterIntakePagination';
import ExportButton from './ExportButton';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { objectsToCSV, downloadCSV } from '@/utils/exportUtils';

interface WaterIntakeHistoryProps {
  userId: string | undefined;
  onTotalUpdate: (total: number) => void;
}

const WaterIntakeHistory: React.FC<WaterIntakeHistoryProps> = ({ userId, onTotalUpdate }) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const {
    history,
    isLoading,
    currentPage,
    totalPages,
    timeFilter,
    handlePageChange,
    handleFilterChange,
    fetchAllHistory
  } = useWaterIntakeHistory({ userId, onTotalUpdate });

  const handleExport = async () => {
    if (!userId) {
      toast.error('You need to be logged in to export data');
      return;
    }
    
    try {
      setIsExporting(true);
      
      // Fetch all history data for export (not just current page)
      const allHistory = await fetchAllHistory();
      
      if (allHistory.length === 0) {
        toast.warning('No data to export');
        return;
      }
      
      // Define columns and format for CSV
      const csvData = objectsToCSV(allHistory, [
        { key: 'created_at', header: 'Date & Time', formatter: (value) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss') },
        { key: 'amount_ml', header: 'Amount (ml)' },
        { key: 'notes', header: 'Notes' }
      ]);
      
      // Generate filename with current date
      const dateStr = format(new Date(), 'yyyy-MM-dd');
      const filename = `water-intake-history-${dateStr}.csv`;
      
      // Trigger download
      downloadCSV(csvData, filename);
      toast.success('Water intake history exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export water intake history');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-display font-semibold">Water Intake History</h3>
        <div className="flex items-center gap-2">
          <WaterIntakeFilter 
            value={timeFilter} 
            onChange={handleFilterChange} 
          />
          <ExportButton 
            onClick={handleExport} 
            isLoading={isExporting} 
          />
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-gray-400">
          Loading water intake history...
        </div>
      ) : history.length === 0 ? (
        <div className="py-8 text-center text-gray-400">
          No water intake records found for the selected time period.
        </div>
      ) : (
        <>
          <WaterIntakeTable entries={history} />
          <WaterIntakePagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default WaterIntakeHistory;
