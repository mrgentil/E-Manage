// Import required modules
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import entrepriseRoutes from './routes/entrepriseRoutes.js';
import connectDB from './config/db.js';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MySQL database
connectDB();

// Standard Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure CORS for secure cross-origin requests
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
}));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Define API routes
app.use('/api/users', userRoutes);
app.use('/api/entreprises', entrepriseRoutes);

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Serve static files from uploads directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Define PORT for server listening
const PORT = process.env.PORT || 5000;

// Start server on specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
