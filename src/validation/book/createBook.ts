import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

export const createBookSchema = z.object({
  rental: z.string().max(24),
  bookedDates: z
    .array(
      z.number().refine((date) => date >= new Date(new Date().toLocaleDateString()).getTime(), {
        message: 'Booked dates must be in the future',
      })
    )
    .min(1),
});

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createBookSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createBookSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateBookInput = z.infer<typeof createBookSchema>;
export default createBook;
