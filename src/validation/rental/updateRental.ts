import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

export const updateRentalSchema = z.object({
  name: z.string().min(3).max(255).optional(),
  description: z.string().min(10).max(500).optional(),
  category: z.string().min(3).max(255).optional(),
  price: z.number().min(1).optional(),
  discount: z.number().min(0).max(100).optional(),
  location: z.string().min(3).max(255).optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(['available', 'unavailable']).optional(),
  bookedDates: z.array(z.number()).optional(),
});

const updateRental = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = updateRentalSchema.parse(req.body);
    next();
  } catch (error) {
    const result = updateRentalSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type UpdateRentalInput = z.infer<typeof updateRentalSchema>;
export default updateRental;
