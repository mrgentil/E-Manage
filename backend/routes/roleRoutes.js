import express from 'express';
const router = express.Router();
import { createRole, getAllRoles, getRoleById, updateRoleById, deleteRoleById } from '../controllers/roleController.js';

router.route('/').post(createRole).get(getAllRoles);
router.route('/:id').get(getRoleById).put(updateRoleById).delete(deleteRoleById);

export default router;
