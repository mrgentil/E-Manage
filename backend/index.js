import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from "./routes/roleRoutes.js";
import entrepriseRoutes from "./routes/entrepriseRoutes.js";

import connectDB from "./config/db.js";
import * as dotenv from "dotenv";


const app = express();

dotenv.config();

connectDB();

// Configuration de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
    credentials: true,
}));

// Middleware pour parser le JSON
app.use(express.json());

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
