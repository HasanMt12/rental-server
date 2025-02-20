import { Router } from 'express';
import { createBook, getBooks, updateBook } from '../controllers/book';
import validateUser from '../middlewares/validateUser';
import { createBookValidation } from '../validation/book';
const router = Router();

router.post('/', validateUser, createBookValidation, createBook);
router.put('/:id', updateBook);
// router.delete('/:id', validateLessor, deleteRental);
router.get('/', getBooks);

export default router;
