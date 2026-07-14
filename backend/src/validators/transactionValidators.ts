import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(1, 'Title is required'),
    amount: z.coerce.number({ required_error: 'Amount is required' }).positive('Amount must be greater than zero'),
    type: z.enum(['income', 'expense'], {
      errorMap: () => ({ message: 'Type must be either "income" or "expense"' })
    }),
    category: z.string({ required_error: 'Category is required' }).min(1, 'Category is required'),
    notes: z.string().optional().nullable(),
    transactionDate: z.coerce.date().optional()
  })
});

export const updateTransactionSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title cannot be empty').optional(),
    amount: z.coerce.number().positive('Amount must be greater than zero').optional(),
    type: z.enum(['income', 'expense'], {
      errorMap: () => ({ message: 'Type must be either "income" or "expense"' })
    }).optional(),
    category: z.string().min(1, 'Category cannot be empty').optional(),
    notes: z.string().optional().nullable(),
    transactionDate: z.coerce.date().optional()
  })
});
