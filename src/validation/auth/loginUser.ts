import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

export const loginUserSchema = z.object({
  email: z
    .string()
    .email('Envalid email')
    .regex(/@gmail.com$/, { message: 'Only gmail accounts are allowed' }),
  password: z.string().min(6),
});

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = loginUserSchema.parse(req.body);
    next();
  } catch (error) {
    const result = loginUserSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type LoginUserInput = z.infer<typeof loginUserSchema>;
export default loginUser;
