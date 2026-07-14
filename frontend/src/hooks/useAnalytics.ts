import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

export interface CategoryBreakdownItem {
  category: string;
  amount: number;
}

export interface CashFlowItem {
  month: string;
  income: number;
  expenses: number;
}

export interface AnalyticsResponse {
  success: boolean;
  message: string;
  data: {
    expensesByCategory: CategoryBreakdownItem[];
    monthlyCashFlow: CashFlowItem[];
    savingsRate: number;
    largestExpense: {
      id: string;
      title: string;
      amount: number;
      category: string;
      transactionDate: string;
    } | null;
    financialHealthScore: number;
    smartSpendingInsights: string[];
  };
}

const fetchAnalytics = async (): Promise<AnalyticsResponse['data']> => {
  const res = await axiosInstance.get<AnalyticsResponse>('/analytics');
  return res.data.data;
};

export function useAnalyticsQuery() {
  return useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: fetchAnalytics
  });
}
