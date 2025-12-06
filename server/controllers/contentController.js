import Course from '../models/Course.js';
import { generateChapterContent } from '../services/aiService.js';

export const getChapterContent = async (req, res) => {
    const { courseId, chapterId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Find the module and chapter
        let targetChapter = null;
        let pModule = null;

        for (const mod of course.roadmap) {
            const chap = mod.chapters.id(chapterId);
            if (chap) {
                targetChapter = chap;
                pModule = mod;
                break;
            }
        }

        if (!targetChapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        // Return existing content if available
        if (targetChapter.content) {
            return res.json({ content: targetChapter.content });
        }

        // Generate content if missing
        console.log(`Generating content for: ${targetChapter.title}`);
        const content = await generateChapterContent(
            course.topic,
            targetChapter.title,
            targetChapter.keyConcepts.join(", ")
        );

        // Save generated content
        targetChapter.content = content;
        await course.save();

        res.json({ content });

    } catch (error) {
        console.error("Get Content Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
