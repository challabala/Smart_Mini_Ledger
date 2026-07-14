import { z } from 'zod';

export const createBudgetSchema = z.object({
  body: z.object({
    category: z.string({ required_error: 'Category is required' }).min(1, 'Category is required'),
    monthlyLimit: z.coerce.number({ required_error: 'Monthly limit is required' }).positive('Monthly limit must be greater than zero')
  })
});

export const updateBudgetSchema = z.object({
  body: z.object({
    category: z.string().min(1, 'Category cannot be empty').optional(),
    monthlyLimit: z.coerce.number().positive('Monthly limit must be greater than zero').optional()
  })
});
