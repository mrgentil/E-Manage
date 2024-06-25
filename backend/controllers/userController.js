import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

// Create a new user
const createUser = asyncHandler(async (req, res) => {
    const {name, email, password, phone, address, role, enterprise} = req.body;

    if (!name || !email || !password || !phone || !address || !role || !enterprise) {
        res.status(400);
        throw new Error("Veuillez remplir tous les champs.");
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error("L'utilisateur existe déjà");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        role,
        enterprise,
    });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            isAdmin: newUser.isAdmin,
            role: newUser.role,
            enterprise: newUser.enterprise,
        });
    } catch (error) {
        res.status(400);
        throw new Error("Données utilisateur invalides");
    }
});

// User login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(200).json({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                address: existingUser.address,
                isAdmin: existingUser.isAdmin,
                role: existingUser.role,
                enterprise: existingUser.enterprise,
            });
            return;
        } else {
            res.status(401);
            throw new Error("Mot de passe incorrect.");
        }
    } else {
        res.status(401);
        throw new Error("Utilisateur non trouvé.");
    }
});

// User logout
const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({message: "Déconnexion réussie"});
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// Get current user profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
            role: user.role,
            enterprise: user.enterprise,
        });
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé.");
    }
});

// Update current user profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            isAdmin: updatedUser.isAdmin,
            role: updatedUser.role,
            enterprise: updatedUser.enterprise,
        });
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé.");
    }
});

// Delete user by ID
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Impossible de supprimer un utilisateur administrateur.");
        }

        await user.remove();
        res.json({message: "Utilisateur supprimé avec succès"});
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé.");
    }
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé.");
    }
});

// Update user by ID
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        user.isAdmin = Boolean(req.body.isAdmin);
        user.role = req.body.role || user.role;
        user.enterprise = req.body.enterprise || user.enterprise;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            isAdmin: updatedUser.isAdmin,
            role: updatedUser.role,
            enterprise: updatedUser.enterprise,
        });
    } else {
        res.status(404);
        throw new Error("Utilisateur non trouvé.");
    }
});

export {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
};
