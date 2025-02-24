import { Router } from 'express';
import { getCategory } from '../controllers/category';
import validateAdmin from '../middlewares/validateAdmin';
import validateToken from '../middlewares/validateToken';
import adminRoutes from './admin';
import authRoutes from './auth';
import bookRoutes from './book';
import contactRoutes from './contact';
import metaDataRoutes from './metadata';
import rentalRoutes from './rental';
import reviewRoutes from './review';
import blogRoutes from './blog';
import companyRoutes from './company';

const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/rental', rentalRoutes);
router.use('/api/v1/book', validateToken, bookRoutes);
router.use('/api/v1/admin', validateToken, validateAdmin, adminRoutes);
router.use('/api/v1/metadata', metaDataRoutes);
router.get('/api/v1/category', getCategory);
router.use('/api/v1/contact', contactRoutes);
router.use('/api/v1/review', reviewRoutes);
router.use('/api/v1/blog', blogRoutes);
router.use('/api/v1/company', companyRoutes);

export default router;
