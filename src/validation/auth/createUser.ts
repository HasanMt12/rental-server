import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z
    .string()
    .email('Envalid email')
    .regex(/@gmail.com$/, { message: 'Only gmail accounts are allowed' }),
  password: z.string().min(6),
  photo: z.string().url().optional(),
  role: z.enum(['user', 'lessor']).optional(),
});

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createUserSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createUserSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateUserInput = z.infer<typeof createUserSchema>;
export default createUser;
