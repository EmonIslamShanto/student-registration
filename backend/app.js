import express from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import studentRoutes from './routes/student.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/v1/students', studentRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
