import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

export const createContactSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});

const createContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createContactSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createContactSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateRentalInput = z.infer<typeof createContactSchema>;
export default createContact;
