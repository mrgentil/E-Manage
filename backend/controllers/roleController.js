import Role from '../models/roleModel.js';

// Créer un rôle
export const createRole = async (req, res) => {
    const { name } = req.body;

    try {
        const roleExists = await Role.findOne({ name });

        if (roleExists) {
            return res.status(400).json({ message: 'Role already exists' });
        }

        const role = await Role.create({ name });

        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Récupérer tous les rôles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Récupérer un rôle par ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Mettre à jour un rôle par ID
export const updateRoleById = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        role.name = name || role.name;

        const updatedRole = await role.save();
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Supprimer un rôle par ID
export const deleteRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        await role.remove();
        res.status(200).json({ message: 'Role deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
