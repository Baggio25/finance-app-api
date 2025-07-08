import { z } from 'zod';

export const createUserSchema = z.object({
    firstName: z.string().trim().min(3, {
        message: 'First name is required',
    }),
    lastName: z.string().trim().min(3, {
        message: 'Last name is required',
    }),
    email: z
        .string({
            required_error: 'E-mail is required',
        })
        .email({
            message: 'Please, provide a valid e-mail',
        }),
    password: z
        .string({
            required_error: 'Password is required',
        })
        .trim()
        .min(6, {
            message: 'Password must have at least 6 characters',
        }),
});

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Some provided field is not allowed',
});
