import express from 'express';
import {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
}
    from '../controllers/roleController.js';

const router = express.Router();

// Route pour créer une entreprise avec téléchargement de fichier
router.post('/create', createRole);

// Route pour obtenir toutes les entreprises
router.get('/', getRoles);

// Route pour obtenir une entreprise par ID
router.get('/:id', getRoleById);

// Route pour mettre à jour une entreprise
router.put('/:id', updateRole);

// Route pour supprimer une entreprise
router.delete('/:id', deleteRole);

export default router;
