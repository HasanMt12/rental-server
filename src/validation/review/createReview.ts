import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(500),
});

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createReviewSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createReviewSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export default createReview;
