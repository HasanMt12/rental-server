import { Router } from 'express';
import { deleteUser, getRentals, getUsers, updateUser, userMetaData } from '../controllers/admin';
import { createCategory, deleteCategory, getCategory, updateCategory } from '../controllers/category';
const router = Router();

router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/rentals', getRentals);

router.post('/category', createCategory);
router.get('/category', getCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

router.get('/users/:id/metadata', userMetaData);

export default router;
