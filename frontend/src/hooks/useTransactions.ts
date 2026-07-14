import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  notes?: string | null;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: {
    transactions: Transaction[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

export interface TransactionQueryParams {
  search?: string;
  category?: string;
  type?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

const fetchTransactions = async (params: TransactionQueryParams): Promise<TransactionsResponse['data']> => {
  const res = await axiosInstance.get<TransactionsResponse>('/transactions', { params });
  return res.data.data;
};

export function useTransactionsQuery(params: TransactionQueryParams = {}) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => fetchTransactions(params)
  });
}

export function useCreateTransactionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.post('/transactions', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success('Transaction added successfully!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to add transaction');
    }
  });
}

export function useUpdateTransactionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await axiosInstance.put(`/transactions/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success('Transaction updated!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to update transaction');
    }
  });
}

export function useDeleteTransactionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/transactions/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      toast.success('Transaction deleted.');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete transaction');
    }
  });
}
