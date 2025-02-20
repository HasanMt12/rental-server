import { Router } from 'express';
import { createLessor, createUser, getUserData, loginUser, logoutUser } from '../controllers/auth';
import validateToken from '../middlewares/validateToken';
import { createUserValidation, loginUserValidation } from '../validation/auth';
const router = Router();

router.post('/register', createUserValidation, createUser);
router.post('/register/lessor', createUserValidation, createLessor);
router.post('/login', loginUserValidation, loginUser);
router.post('/logout', logoutUser);
router.get('/token', validateToken, getUserData);

export default router;
