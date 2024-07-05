import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import Entreprise from '../models/entrepriseModel.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Créer un utilisateur
export const createUser = asyncHandler(async (req, res) => {
    const { name, email, phone, address, password, role, entreprise } = req.body;

    const roleExists = await Role.findOne({ name: role });
    if (!roleExists) {
        res.status(400);
        throw new Error('Role not found');
    }

    const entrepriseExists = await Entreprise.findOne({ name: entreprise });
    if (!entrepriseExists) {
        res.status(400);
        throw new Error('Entreprise not found');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        phone,
        address,
        password,
        role: roleExists._id,
        entreprise: entrepriseExists._id
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            entreprise: user.entreprise,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role').populate('entreprise');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Récupérer un utilisateur par ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('role').populate('entreprise');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
};

// Mettre à jour un utilisateur par ID
export const updateUserById = async (req, res) => {
    try {
        const { name, email, phone, address, role, entreprise } = req.body;
        const avatar = req.file ? req.file.path : null;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (role) {
            const roleExists = await Role.findOne({ name: role });
            if (!roleExists) {
                res.status(400);
                throw new Error('Role not found');
            }
            user.role = roleExists._id;
        }

        if (entreprise) {
            const entrepriseExists = await Entreprise.findOne({ name: entreprise });
            if (!entrepriseExists) {
                res.status(400);
                throw new Error('Entreprise not found');
            }
            user.entreprise = entrepriseExists._id;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        if (avatar) {
            if (user.avatar) {
                fs.unlinkSync(user.avatar); // Supprimer l'ancien fichier avatar
            }
            user.avatar = avatar;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Supprimer un utilisateur par ID
export const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.avatar) {
            fs.unlinkSync(user.avatar); // Supprimer le fichier avatar
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Connexion utilisateur
export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email }).populate('role').populate('entreprise');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            entreprise: user.entreprise,
            avatar: user.avatar,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Profil utilisateur
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('role').populate('entreprise');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Middleware pour la protection des routes
export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Déconnexion utilisateur
export const logoutUser = async (req, res) => {
    // La déconnexion côté serveur peut être gérée en informant le client de supprimer le jeton
    res.status(200).json({ message: 'User logged out' });
};
