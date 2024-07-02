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

router.route('/')
    .post(upload.single('avatar'), createUser)
    .get(getAllUsers);

router.route('/:id')
    .get(getUserById)
    .put(upload.single('avatar'), updateUserById)
    .delete(deleteUserById);

router.get('/profile', protect, getUserProfile);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
