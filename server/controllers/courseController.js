import Course from '../models/Course.js';
import { generateCourseRoadmap } from '../services/aiService.js';

export const createCourse = async (req, res) => {
    const { topic, level, goal } = req.body;
    // const userId = req.user?.id; // Assuming auth middleware populates req.user

    if (!topic || !level || !goal) {
        return res.status(400).json({ message: "Topic, level, and goal are required" });
    }

    try {
        const roadmapData = await generateCourseRoadmap(topic, level, goal);

        const newCourse = new Course({
            // user: userId,
            title: roadmapData.title || `Course: ${topic}`,
            topic,
            level,
            goal,
            roadmap: roadmapData.modules
        });

        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (error) {
        console.error("Course Creation Error:", error);
        res.status(500).json({ message: "Failed to generate course", error: error.message });
    }
};

export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        console.error("Get Course Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
