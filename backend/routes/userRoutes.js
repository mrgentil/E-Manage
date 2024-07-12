import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    deleteUser,
    logoutUser,
    updateUser
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser); // Optionnel

// Routes protégées
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUser);

// Routes admin
router.get('/', protect, admin, getAllUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;
