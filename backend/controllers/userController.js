import User from '../models/userModel.js';
import Entreprise from '../models/entrepriseModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {sendEmail} from "../../emailService.js";

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

        const roleDoc = await Role.findOne({ where: { name: role } });
        if (!roleDoc) {
            return res.status(404).json({ message: 'Role non trouvé' });
        }

        const user = await User.create({
            name,
            email,
            phone,
            address,
            roleId: roleDoc.id,
            entrepriseId: entrepriseDoc.id,
            password
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Bonjour ${name},</p>
                <p>Votre compte a été créé avec succès. Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
                <a href="http://localhost:5173/reset-password?token=${token}" style="color: blue; text-decoration: underline;">Réinitialiser le mot de passe</a>
                <p>Merci.</p>
            </div>
        `;

        await sendEmail(email, 'Bienvenue !', emailHtml);

        res.status(201).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
    }
};


// Route pour réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Bonjour ${user.name},</p>
                <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
                <a href="http://localhost:5173/reset-password?token=${token}" style="color: blue; text-decoration: underline;">Réinitialiser le mot de passe</a>
                <p>Merci.</p>
            </div>
        `;

        await sendEmail(email, 'Réinitialisation du mot de passe', emailHtml);

        res.status(200).json({ message: 'Email de réinitialisation envoyé' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
    }
};

// Mise à jour du mot de passe
export const updatePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, {
            include: [
                {
                    model: Entreprise,
                    attributes: ['name'],
                },
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
        });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        console.log('Mise à jour du mot de passe pour l\'utilisateur:', user.email);
        user.password = newPassword; // Assigner le nouveau mot de passe directement
        await user.save();

        console.log('Mot de passe mis à jour avec succès pour l\'utilisateur:', user.email);

        // Générer un nouveau token JWT
        const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                entreprise: user.Entreprise ? user.Entreprise.name : null,
                role: user.Role ? user.Role.name : null,
            },
            token: newToken,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
    }
};

// Connexion d'un utilisateur
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            where: { email },
            include: [ // Inclure les données associées
                { model: Role },
                { model: Entreprise }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

// Déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Déconnexion réussie' });
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    const { page = 1, limit = 15 } = req.query;
    try {
        const users = await User.findAndCountAll({
            include: [
                {
                    model: Entreprise,
                    attributes: ['name'],
                },
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
            offset: (page - 1) * limit,
            limit: parseInt(limit),
        });
        res.status(200).json({
            rows: users.rows,
            count: users.count,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, role, entreprise, password } = req.body;

        // Trouver l'utilisateur par ID
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si un nom d'entreprise est fourni, obtenir l'ID correspondant
        if (entreprise) {
            const entrepriseRecord = await Entreprise.findOne({ where: { name: entreprise } });
            if (entrepriseRecord) {
                user.entrepriseId = entrepriseRecord.id;
            } else {
                return res.status(400).json({ message: 'Entreprise non trouvée' });
            }
        }

        if (role) {
            const roleRecord = await Role.findOne({ where: { name: role } });
            if (roleRecord) {
                user.roleId = roleRecord.id;
            } else {
                return res.status(400).json({ message: 'ROle non trouvé' });
            }
        }

        // Mise à jour des autres champs
        user.name = name !== undefined ? name : user.name;
        user.email = email !== undefined ? email : user.email;
        user.phone = phone !== undefined ? phone : user.phone;
        user.address = address !== undefined ? address : user.address;


        // Mise à jour du mot de passe si fourni
        if (password) {
            user.password = await bcrypt.hash(password, 10); // Hachage du mot de passe
        }

        // Sauvegarde des modifications
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        console.error('Erreur:', err);
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
