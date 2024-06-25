import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
        throw new Error("Please fill all the inputs.");
    }

    const userExists = await User.findOne({ email });
    if (userExists) res.status(400).send("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, phone, address, password: hashedPassword });

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
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (isPasswordValid) {
            createToken(res, existingUser._id);

            return res.status(200).json({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone: existingUser.phone,
                address: existingUser.address,
                isAdmin: existingUser.isAdmin,
            });
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httyOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.username || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.email || user.phone;
        user.address = req.body.email || user.address;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            addres: updatedUser.addres,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Cannot delete admin user");
        }

        await User.deleteOne({ _id: user._id });
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found.");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.username || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.email || user.phone;
        user.address = req.body.email || user.address;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
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
