import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token reçu:', token); // Log token reçu
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token décodé:', decoded); // Log token décodé
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });
            console.log('Utilisateur authentifié:', req.user); // Log utilisateur authentifié
            next();
        } catch (err) {
            console.error('Erreur de token:', err); // Log erreur token
            res.status(401).json({ message: 'Non autorisé, token échoué' });
        }
    } else {
        if (!token) {
            console.log('Pas de token reçu'); // Log pas de token
            res.status(401).json({ message: 'Non autorisé, pas de token' });
        }
    }
};

export const admin = (req, res, next) => {
    console.log('Vérification du rôle admin pour l\'utilisateur:', req.user); // Log utilisateur pour vérifier le rôle
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(401).json({ message: 'Non autorisé en tant qu\'administrateur' });
    }
};

