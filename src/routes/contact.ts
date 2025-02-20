import { Router } from 'express';
import { createContact, deleteContact, getContacts } from '../controllers/contact';
import validateAdmin from '../middlewares/validateAdmin';
import validateToken from '../middlewares/validateToken';
import { createContactValidation } from '../validation/contact';
const router = Router();

router.post('/', createContactValidation, createContact);
router.get('/', validateToken, validateAdmin, getContacts);
router.delete('/:id', validateToken, validateAdmin, deleteContact);

export default router;
