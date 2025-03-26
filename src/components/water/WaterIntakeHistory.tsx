
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

interface WaterIntakeHistoryProps {
  userId: string | undefined;
  onTotalUpdate: (total: number) => void;
}

interface WaterIntakeEntry {
  id: string;
  amount_ml: number;
  created_at: string;
  notes: string | null;
}

const WaterIntakeHistory: React.FC<WaterIntakeHistoryProps> = ({ userId, onTotalUpdate }) => {
  const [history, setHistory] = useState<WaterIntakeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [timeFilter, setTimeFilter] = useState<string>("today");
  const itemsPerPage = 5;

  useEffect(() => {
    if (userId) {
      fetchWaterIntakeHistory();
    }
  }, [userId, currentPage, timeFilter]);

  const fetchWaterIntakeHistory = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    
    try {
      // Calculate date range based on filter
      let startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      
      switch (timeFilter) {
        case "week":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "month":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "all":
          startDate = new Date(0); // Beginning of time
          break;
        // "today" is default, already set
      }
      
      // First get count for pagination
      const countQuery = supabase
        .from('water_intake')
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString());
      
      const { count, error: countError } = await countQuery;
      
      if (countError) throw countError;
      
      // Calculate total pages
      const totalItems = count || 0;
      setTotalPages(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
      
      // Adjust current page if it's out of bounds
      if (currentPage > totalPages) {
        setCurrentPage(1);
      }
      
      // Calculate offset
      const offset = (currentPage - 1) * itemsPerPage;
      
      // Get paginated data
      const { data, error } = await supabase
        .from('water_intake')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false })
        .range(offset, offset + itemsPerPage - 1);
        
      if (error) throw error;
      
      setHistory(data || []);
      
      // Also fetch total water intake for today to update the visualization
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data: todayData, error: todayError } = await supabase
        .from('water_intake')
        .select('amount_ml')
        .eq('user_id', userId)
        .gte('created_at', today.toISOString());
      
      if (todayError) throw todayError;
      
      const todayTotal = todayData.reduce((sum, entry) => sum + entry.amount_ml, 0);
      onTotalUpdate(todayTotal);
      
    } catch (error: any) {
      console.error('Error fetching water intake history:', error);
      toast.error('Failed to load water intake history');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy h:mm a');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-display font-semibold">Water Intake History</h3>
        <div className="min-w-32">
          <Select value={timeFilter} onValueChange={handleFilterChange}>
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
                {history.map((entry) => (
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

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Simple logic to show current page and some pages around it
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        isActive={currentPage === pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default WaterIntakeHistory;
