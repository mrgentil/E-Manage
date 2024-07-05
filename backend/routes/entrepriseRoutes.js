import express from 'express';
import {
    createEntreprise,
    getAllEntreprises,
    getEntrepriseById,
    updateEntrepriseById,
    deleteEntrepriseById,
} from '../controllers/entrepriseController.js';

const router = express.Router();

router.route('/')
    .post(createEntreprise)
    .get(getAllEntreprises);

router.route('/:id')
    .get(getEntrepriseById)
    .put(updateEntrepriseById)
    .delete(deleteEntrepriseById);

export default router;
