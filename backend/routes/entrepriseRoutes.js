import express from 'express';
import { createEntreprise, getEntreprises, getEntrepriseById, updateEntreprise, deleteEntreprise } from '../controllers/entrepriseController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Route pour créer une entreprise avec téléchargement de fichier
router.post('/create', upload.single('logo'), createEntreprise);

// Route pour obtenir toutes les entreprises
router.get('/', getEntreprises);

// Route pour obtenir une entreprise par ID
router.get('/:id', getEntrepriseById);

// Route pour mettre à jour une entreprise
router.put('/:id', upload.single('logo'), updateEntreprise);

// Route pour supprimer une entreprise
router.delete('/:id', deleteEntreprise);

export default router;
