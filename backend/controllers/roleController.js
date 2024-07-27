import Role from '../models/roleModel.js';

// Créer un role
export const createRole = async (req, res) => {
    try {
        const { name} = req.body;

        // Vérifiez si le champ 'name' est fourni
        if (!name) {
            return res.status(400).json({ error: "Le champ 'name' est requis." });
        }

        const role = await Role.create({
            name,
        });

        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir tous les roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir un role par ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role non trouvé' });
        }
        res.status(200).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un role
export const updateRole = async (req, res) => {
    try {
        const { name } = req.body;
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role non trouvé' });
        }
        role.name = name || role.name;
        const updatedRole = await role.save();
        res.status(200).json(updatedRole);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un role
export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);

        if (!role) {
            return res.status(404).json({ message: 'Role non trouvé' });
        }
        await role.destroy();
        res.status(200).json({ message: 'Role supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


