import express from "express";
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
} from "../controllers/roleController.js";

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes accessibles seulement par l'administrateur
router
    .route("/")
    .post(authenticate, authorizeAdmin, createRole)
    .get(authenticate, authorizeAdmin, getAllRoles);

router
    .route("/:id")
    .get(authenticate, authorizeAdmin, getRoleById)
    .put(authenticate, authorizeAdmin, updateRoleById)
    .delete(authenticate, authorizeAdmin, deleteRoleById);

export default router;
