import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Créer un utilisateur
export const createUser = async (req, res) => {
    const { name, email, phone, address, password, roles } = req.body;
    const avatar = req.file ? req.file.path : null;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Find the corresponding Role document
        const role = await Role.findOne({ name: roles });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Create a new user with the role
        const user = await User.create({ name, email, phone, address, password, avatar, roles: [role._id] });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Récupérer un utilisateur par ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Mettre à jour un utilisateur par ID
export const updateUserById = async (req, res) => {
    try {
        const { name, email, phone, address, roles } = req.body;
        const avatar = req.file ? req.file.path : null;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.roles = roles || user.roles;

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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('roles');

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
            roles: user.roles,
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
        const user = await User.findById(req.user.id).populate('roles');

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
            req.user = await User.findById(decoded.userid).select('-password');
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
