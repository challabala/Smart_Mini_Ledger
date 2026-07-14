import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export interface Budget {
  id: string;
  userId: string;
  category: string;
  monthlyLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface BudgetsResponse {
  success: boolean;
  message: string;
  data: Budget[];
}

const fetchBudgets = async (): Promise<Budget[]> => {
  const res = await axiosInstance.get<BudgetsResponse>('/budgets');
  return res.data.data;
};

export function useBudgetsQuery() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: fetchBudgets
  });
}

export function useCreateBudgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { category: string; monthlyLimit: number }) => {
      const res = await axiosInstance.post('/budgets', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Budget created successfully!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to create budget');
    }
  });
}

export function useUpdateBudgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { category?: string; monthlyLimit?: number } }) => {
      const res = await axiosInstance.put(`/budgets/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Budget limit updated!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update budget');
    }
  });
}

export function useDeleteBudgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/budgets/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Budget removed.');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete budget');
    }
  });
}
