import { z } from 'zod';
import validator from 'validator';

export const createTransactionSchema = z.object({
    userId: z
        .string({
            required_error: 'User id is required',
        })
        .uuid({
            message: 'User id must be a valida UUID',
        }),
    name: z.string().trim().min(1, {
        message: 'Name is required',
    }),
    date: z
        .string({
            required_error: 'Date is required',
        })
        .datetime({
            message: 'Date must be a valid date',
        }),
    amount: z
        .number({
            invalid_type_error: 'Amount must be a number',
            required_error: 'Amount is required',
        })
        .min(1, {
            message: 'Amount must be greater than 0',
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_decimal: true,
                decimal_separator: '.',
            }),
        ),
    type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
        errorMap: () => ({
            message: 'Type must be EXPENSE, EARNING or INVESTMENT',
        }),
    }),
});
