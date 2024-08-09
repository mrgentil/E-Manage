import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Role from '../models/roleModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        console.log('Received token:', token); // Log the token
        if (!token) {
            res.status(401);
            throw new Error('Not authorized, no token');
        }

        // The rest of your code...
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const authenticate = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Stocke l'utilisateur dans `req.user`
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate.' });
    }
};




const admin = (req, res, next) => {
    if (req.user && req.user.Role && req.user.Role.name === 'Administrateur') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

export {protect, admin, authenticate};
