import express from 'express';
const router = express.Router();
import { createEntreprise, getAllEntreprises, getEntrepriseById, updateEntrepriseById, deleteEntrepriseById } from '../controllers/entrepriseController.js';

router.route('/').post(createEntreprise).get(getAllEntreprises);
router.route('/:id').get(getEntrepriseById).put(updateEntrepriseById).delete(deleteEntrepriseById);

export default router;
