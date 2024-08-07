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
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!token) {
                res.status(401);
                throw new Error('Not authorized, no token');
            }

            // Verify token and extract payload
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded); // Log the decoded token

            // Find the user by userId from the token
            req.user = await User.findByPk(decoded.userId, {
                include: [{ model: Role, attributes: ['name'] }]
            });

            if (!req.user) {
                console.error('User not found with ID:', decoded.userId); // Log the missing user ID
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            next();
        } catch (error) {
            console.error('Error decoding token:', error);
            res.status(401);
            if (error.name === 'TokenExpiredError') {
                res.json({ message: 'Token expired', stack: error.stack });
            } else if (error.name === 'JsonWebTokenError') {
                res.json({ message: 'Invalid token', stack: error.stack });
            } else {
                res.json({ message: 'Not authorized, token failed', stack: error.stack });
            }
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { id: decoded.userId } });

        if (!user) {
            throw new Error();
        }

        req.user = user;
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

export { protect, admin, authenticate };
