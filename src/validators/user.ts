import { urlRegex } from '../types';
import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(2).max(30).optional(),
    about: z.string().min(2).max(200).optional(),
    avatar: z.string().regex(urlRegex, 'Некорректный URL').optional(),
    email: z.string().email({ message: 'Некорректный email' }),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

export const loginUserSchema = z.object({
    email: z.string().email({ message: 'Некорректный email' }),
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

export const getUserIdSchema = z.object({
    params: z.object({
        userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Некорректный формат userId'),
    })
})

export const patchUserSchema = z.object({
    name: z.string().min(2).max(30).optional(),
    about: z.string().min(2).max(200).optional(),
})

export const patchUserAvatarSchema = z.object({
    avatar: z.string().regex(urlRegex, 'Некорректный URL').optional(),

})

