import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticate = async (req, res, next) => {
    let token;

    // Vérifier si le token est dans les headers Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraire le token du header
            token = req.headers.authorization.split(' ')[1];

            // Vérifier et décoder le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Ajouter l'utilisateur au request object
            req.user = await User.findById(decoded.userId).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next(); // Passer au middleware suivant si l'utilisateur est authentifié
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // Passer au middleware suivant si l'utilisateur est un admin
    } else {
        return res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
