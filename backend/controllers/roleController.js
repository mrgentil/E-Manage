import Role from "../models/documentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Create a new role
const createRole = asyncHandler(async (req, res) => {
    const {name} = req.body;

    if (!name) {
        res.status(400);
        throw new Error("Veuillez fournir un nom de rôle.");
    }

    const roleExists = await Role.findOne({name});
    if (roleExists) {
        res.status(400);
        throw new Error("Le rôle existe déjà.");
    }

    const newRole = new Role({name});

    try {
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(400);
        throw new Error("Données de rôle invalides.");
    }
});

// Get all roles
const getAllRoles = asyncHandler(async (req, res) => {
    const roles = await Role.find({});
    res.json(roles);
});

// Get role by ID
const getRoleById = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);

    if (role) {
        res.json(role);
    } else {
        res.status(404);
        throw new Error("Rôle non trouvé.");
    }
});

// Update role by ID
const updateRoleById = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);

    if (role) {
        role.name = req.body.name || role.name;

        const updatedRole = await role.save();
        res.json(updatedRole);
    } else {
        res.status(404);
        throw new Error("Rôle non trouvé.");
    }
});

// Delete role by ID
const deleteRoleById = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);

    if (role) {
        await Role.deleteOne({_id: role._id});
        res.json({message: "Rôle supprimé avec succès."});
    } else {
        res.status(404);
        throw new Error("Rôle non trouvé.");
    }
});

export {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
};
