import User from '../models/userModel.js';
import Entreprise from '../models/entrepriseModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Enregistrement d'un utilisateur
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, address, role, entreprise, password } = req.body;

        if (!name || !email || !password || !entreprise || !role || !phone || !address) {
            return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires' });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        const entrepriseDoc = await Entreprise.findOne({ where: { name: entreprise } });
        if (!entrepriseDoc) {
            return res.status(404).json({ message: 'Entreprise non trouvée' });
        }

        const user = await User.create({
            name,
            email,
            phone,
            address,
            role,
            entrepriseId: entrepriseDoc.id,
            password
        });

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
    }
};


// Connexion d'un utilisateur
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, role, entrepriseId, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (password) {
            user.password = password; // Le mot de passe sera haché par le hook beforeSave
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.role = role || user.role;
        user.entrepriseId = entrepriseId || user.entrepriseId;

        await user.save();

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Gestion du profil de l'utilisateur
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.user; // L'ID de l'utilisateur peut être obtenu à partir du token JWT
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await user.destroy();
        res.status(204).json(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
