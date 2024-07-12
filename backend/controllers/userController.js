import User from '../models/userModel.js';
import Entreprise from '../models/entrepriseModel.js';
import jwt from 'jsonwebtoken';

// Inscription
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, address, role, entreprise, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }

        // Trouver l'entreprise par son nom
        const entrepriseDoc = await Entreprise.findOne({ name: entreprise });
        if (!entrepriseDoc) {
            return res.status(404).json({ message: 'Entreprise non trouvée' });
        }

        // Créer un nouvel utilisateur avec l'identifiant de l'entreprise
        const user = new User({
            name,
            email,
            phone,
            address,
            role,
            entreprise: entrepriseDoc._id, // Utiliser l'ObjectId de l'entreprise
            password
        });
        await user.save();

        // Générer un token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Connexion
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token
        const token = jwt.sign({ id: user._id, role: user.role }, 'votre_secret', { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Profil utilisateur
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mise à jour du profil utilisateur
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.entreprise = req.body.entreprise || user.entreprise;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Liste des utilisateurs (par exemple pour un Admin)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Suppression d'un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        await user.remove();
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
