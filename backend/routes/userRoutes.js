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
import {admin, protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Routes protégées



// Routes admin
router.get('/', protect, admin, getAllUsers);
router.route('/:id')
    .get(protect, getUserProfile)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

// Routes de réinitialisation de mot de passe
router.post('/reset-password', resetPassword);
router.post('/update-password', updatePassword);

export default router;
