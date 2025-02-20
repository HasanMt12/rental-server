import { Router } from 'express';
import { createLessorMetaData, createRentalMetaData, deleteLessorMetaData, deleteRentalMetaData, getLessorMetaData, getRentalMetaData, updateLessorMetaData, updateRentalMetaData } from '../controllers/metadata';
import validateLessor from '../middlewares/validateLessor';
import validateToken from '../middlewares/validateToken';
const router = Router();

router.post('/lessor', validateToken, validateLessor, createLessorMetaData);
router.post('/rentalitem', validateToken, validateLessor, createRentalMetaData);
router.get('/lessor', validateToken, validateLessor, getLessorMetaData);
router.get('/rentalitem/:id', getRentalMetaData);

router.put('/lessor/:id', validateToken, validateLessor, updateLessorMetaData);
router.put('/:metaId/rental/:rentalId', validateToken, validateLessor, updateRentalMetaData);

router.delete('/:metaId/rental/:rentalId', validateToken, validateLessor, deleteRentalMetaData);
router.delete('/:metaId', validateToken, validateLessor, deleteLessorMetaData);

export default router;
