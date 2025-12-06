import { generateQuiz } from '../services/aiService.js';

export const createQuiz = async (req, res) => {
    const { topic, level } = req.body;

    if (!topic || !level) {
        return res.status(400).json({ message: "Topic and level are required" });
    }

    try {
        const quiz = await generateQuiz(topic, level);
        // For simplicity, we just return the quiz json. 
        // In a real app we might save it to DB associated with a user/course.
        res.json(quiz);
    } catch (error) {
        console.error("Create Quiz Error:", error);
        res.status(500).json({ message: "Failed to generate quiz" });
    }
};
