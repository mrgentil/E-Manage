// middlewares/roleMiddleware.js

export const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.Role.name)) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
