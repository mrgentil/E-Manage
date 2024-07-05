import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from "./routes/roleRoutes.js";
import entrepriseRoutes from "./routes/entrepriseRoutes.js";
import connectDB from "./config/db.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";


dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
    credentials: true,
}));

// Middleware pour parser le JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/entreprises', entrepriseRoutes);

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Rendre le dossier des uploads statique
const __dirname = path.resolve();
app.use("/uploads/avatars", express.static(path.join(__dirname + "/uploads/avatars")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
