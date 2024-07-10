import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById, protect, getUserProfile, logoutUser, loginUser,
} from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Définir d'abord la route pour le profil utilisateur
router.get('/profile', protect, getUserProfile);

// Ensuite, définir les routes pour CRUD des utilisateurs
router.route('/')
    .post(upload.single('avatar'), createUser)
    .get(getAllUsers);

router.route('/:id')
    .get(getUserById)
    .put(upload.single('avatar'), updateUserById)
    .delete(deleteUserById);

router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;