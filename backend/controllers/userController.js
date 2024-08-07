import User from '../models/userModel.js';
import Entreprise from '../models/entrepriseModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {sendEmail} from "../../emailService.js";
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/createToken.js";
import {Op} from 'sequelize';

// Enregistrement d'un utilisateur
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, address, roleId, password } = req.body;

        console.log('Received data:', { name, email, phone, address, roleId, password });

        if (!name || !email || !password || !roleId || !phone || !address) {
            return res.status(400).json({ message: 'Veuillez remplir tous les champs obligatoires' });
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        const roleDoc = await Role.findByPk(roleId);
        if (!roleDoc) {
            return res.status(404).json({ message: 'Role non trouvé' });
        }

        const user = await User.create({
            name,
            email,
            phone,
            address,
            roleId: roleDoc.id,
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
    const {email} = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <p>Bonjour ${user.name},</p>
                <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
                <a href="http://localhost:5173/reset-password?token=${token}" style="color: #cd9d63; text-decoration: underline;">Réinitialiser le mot de passe</a>
                <p>Merci.</p>
            </div>
        `;

        await sendEmail(email, 'Réinitialisation du mot de passe', emailHtml);

        res.status(200).json({message: 'Email de réinitialisation envoyé'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erreur lors de la réinitialisation du mot de passe'});
    }
};

// Mise à jour du mot de passe
export const updatePassword = async (req, res) => {
    const {token, newPassword} = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, {
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
        });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }

        console.log('Mise à jour du mot de passe pour l\'utilisateur:', user.email);
        user.password = newPassword; // Assigner le nouveau mot de passe directement
        await user.save();

        console.log('Mot de passe mis à jour avec succès pour l\'utilisateur:', user.email);

        // Générer un nouveau token JWT
        const newToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.Role ? user.Role.name : null,
            },
            token: newToken,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erreur lors de la mise à jour du mot de passe'});
    }
};

// Connexion d'un utilisateur
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({
            where: {email},
            include: [ // Inclure les données associées
                {model: Role},
            ]
        });

        if (!user) {
            return res.status(401).json({message: 'Utilisateur non trouvé'});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message: 'Mot de passe incorrect'});
        }

        // Générer un token JWT
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({token, user});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erreur lors de la connexion'});
    }
};

// Déconnexion d'un utilisateur
export const logoutUser = (req, res) => {
    res.status(200).json({message: 'Déconnexion réussie'});
};

// Récupérer tous les utilisateurs
export const getAllUsers = asyncHandler(async (req, res) => {
    if (req.user.Role.name !== 'Administrateur') {
        res.status(403);
        throw new Error('Not authorized to access this resource');
    }
    // Récupérer les paramètres de pagination depuis la requête
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;

    // Calculer l'offset
    const offset = (page - 1) * pageSize;

    // Récupérer les utilisateurs avec pagination
    const {count, rows} = await User.findAndCountAll({
        include: [
            {model: Role, attributes: ['name']} // Inclure les détails des rôles
        ],
        limit: pageSize,
        offset: offset,
    });

    res.json({
        users: rows,
        totalUsers: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
    });
});


// Mettre à jour un utilisateur
export const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.roleId = req.body.roleId || user.roleId;

        const updatedUser = await user.save();
        res.json({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            roleId: updatedUser.roleId,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// Gestion du profil de l'utilisateur
export const getUserProfile = async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [
            {model: Role, attributes: ['name']}
        ]
    });

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'});
        }

        await user.destroy();
        res.status(204).json(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
};
