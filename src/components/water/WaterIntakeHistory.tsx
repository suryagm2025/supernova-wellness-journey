
import React from 'react';
import { useWaterIntakeHistory } from '@/hooks/water/useWaterIntakeHistory';
import WaterIntakeFilter from './WaterIntakeFilter';
import WaterIntakeTable from './WaterIntakeTable';
import WaterIntakePagination from './WaterIntakePagination';

interface WaterIntakeHistoryProps {
  userId: string | undefined;
  onTotalUpdate: (total: number) => void;
}

const WaterIntakeHistory: React.FC<WaterIntakeHistoryProps> = ({ userId, onTotalUpdate }) => {
  const {
    history,
    isLoading,
    currentPage,
    totalPages,
    timeFilter,
    handlePageChange,
    handleFilterChange
  } = useWaterIntakeHistory({ userId, onTotalUpdate });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-display font-semibold">Water Intake History</h3>
        <WaterIntakeFilter 
          value={timeFilter} 
          onChange={handleFilterChange} 
        />
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
