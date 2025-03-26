
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface WaterIntakeEntry {
  id: string;
  amount_ml: number;
  created_at: string;
  notes: string | null;
}

interface UseWaterIntakeHistoryProps {
  userId: string | undefined;
  onTotalUpdate: (total: number) => void;
}

export const useWaterIntakeHistory = ({ userId, onTotalUpdate }: UseWaterIntakeHistoryProps) => {
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

  const getStartDate = (filter: string): Date => {
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    
    switch (filter) {
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
    
    return startDate;
  };

  const fetchWaterIntakeHistory = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    
    try {
      // Calculate date range based on filter
      const startDate = getStartDate(timeFilter);
      
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

  const fetchAllHistory = async (): Promise<WaterIntakeEntry[]> => {
    if (!userId) return [];
    
    try {
      // Calculate date range based on filter
      const startDate = getStartDate(timeFilter);
      
      // Get all data for the current filter without pagination
      const { data, error } = await supabase
        .from('water_intake')
        .select('*')
        .eq('user_id', userId)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data || [];
      
    } catch (error: any) {
      console.error('Error fetching all water intake history:', error);
      toast.error('Failed to export water intake history');
      return [];
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return {
    history,
    isLoading,
    currentPage,
    totalPages,
    timeFilter,
    handlePageChange,
    handleFilterChange,
    fetchAllHistory
  };
};
