import express from 'express';
import { ExpressAuth } from "@auth/express";
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import cors from 'cors';
import { authConfig } from './config/auth.js';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import courseRoutes from './routes/course.js';
import quizRoutes from './routes/quiz.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: "*",
}));
app.use(express.json());


// Connect to Database
connectDB();

// Mount Auth.js
app.use("/auth", ExpressAuth(authConfig));

// Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
