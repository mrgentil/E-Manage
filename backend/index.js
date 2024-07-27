import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import entrepriseRoutes from './routes/entrepriseRoutes.js';
import { connectDB, sequelize } from './config/db.js';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import roleRoutes from "./routes/roleRoutes.js";

dotenv.config();

const app = express();

(async () => {
    await connectDB();
    await sequelize.sync();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/roles', roleRoutes);

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
