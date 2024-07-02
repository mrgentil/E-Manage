import express from 'express';
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
} from '../controllers/roleController.js';

const router = express.Router();

router.route('/')
    .post(createRole)
    .get(getAllRoles);

router.route('/:id')
    .get(getRoleById)
    .put(updateRoleById)
    .delete(deleteRoleById);

export default router;
