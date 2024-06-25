import express from "express";
import {
    createEnterprise,
    getAllEnterprises,
    getEnterpriseById,
    updateEnterpriseById,
    deleteEnterpriseById,
} from "../controllers/entrepriseController.js";

import {authenticate, authorizeAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes accessibles seulement par l'administrateur
router
    .route("/")
    .post(authenticate, authorizeAdmin, createEnterprise)
    .get(authenticate, authorizeAdmin, getAllEnterprises);

router
    .route("/:id")
    .get(authenticate, authorizeAdmin, getEnterpriseById)
    .put(authenticate, authorizeAdmin, updateEnterpriseById)
    .delete(authenticate, authorizeAdmin, deleteEnterpriseById);

export default router;
