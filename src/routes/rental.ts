import { Router } from 'express';
import { createRental, deleteRental, getRentalDetails, getRentals, getRentalsById, updateRental } from '../controllers/rentalitem';
import validateLessor from '../middlewares/validateLessor';
import validateToken from '../middlewares/validateToken';
import { createRentalValidation, updateRentalValidation } from '../validation/rental';
const router = Router();

router.post('/', validateToken, validateLessor, createRentalValidation, createRental);
router.put('/:id', validateToken, validateLessor, updateRentalValidation, updateRental);
router.delete('/:id', validateToken, validateLessor, deleteRental);
router.get('/lessor', validateToken, validateLessor, getRentalsById);
router.get('/', getRentals);
router.get('/:id', getRentalDetails);

export default router;
