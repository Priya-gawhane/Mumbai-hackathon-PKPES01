import express from 'express';
import { createCourse, getCourse } from '../controllers/courseController.js';
import { getChapterContent } from '../controllers/contentController.js';

const router = express.Router();

console.log("Course Router Loaded");

// Specific routes FIRST
router.get('/test', (req, res) => {
    console.log("Test route hit");
    res.send('Course Route Working');
});

router.post('/generate', createCourse);

// Content route (specific path)
router.get('/:courseId/chapters/:chapterId', getChapterContent);

// Generic ID route LAST
router.get('/:id', getCourse);

export default router;
