import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    deleteUser,
    logoutUser,
    updateUser,
    resetPassword,
    updatePassword
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Routes protégées
router.get('/profile', protect, getUserProfile);
router.put('/:id', updateUser);

// Routes admin
router.get('/',  getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

// Routes de réinitialisation de mot de passe
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);

export default router;
