import { Router } from 'express';
import { createReview, deleteReview, getReviews } from '../controllers/review';
import validateAdmin from '../middlewares/validateAdmin';
import validateToken from '../middlewares/validateToken';
import validateUser from '../middlewares/validateUser';
import { createReviewValidation } from '../validation/review';

const router = Router();

router.post('/', createReviewValidation, validateToken, validateUser, createReview);
router.get('/', getReviews);
router.delete('/:id', validateToken, validateAdmin, deleteReview);

export default router;
