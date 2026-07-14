import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export interface BudgetUsageItem {
  id: string;
  category: string;
  monthlyLimit: number;
  spent: number;
  percentage: number;
}

export interface DashboardSummaryResponse {
  success: boolean;
  message: string;
  data: {
    totalIncome: number;
    totalExpenses: number;
    currentBalance: number;
    transactionCount: number;
    budgetUsage: BudgetUsageItem[];
  };
}

const fetchDashboardSummary = async (): Promise<DashboardSummaryResponse['data']> => {
  const res = await axiosInstance.get<DashboardSummaryResponse>('/dashboard/summary');
  return res.data.data;
};

export function useDashboardQuery() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: fetchDashboardSummary
  });
}
