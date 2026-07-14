import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string({ required_error: 'Full name is required' }).min(2, 'Full name must be at least 2 characters long'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters long')
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required')
  })
});
