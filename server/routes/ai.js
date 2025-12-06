import express from 'express';
import chat from '../controllers/ai.js';

const router = express.Router();

router.get('/chat', chat);

export default router;