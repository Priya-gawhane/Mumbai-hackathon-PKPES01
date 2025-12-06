import { Ollama } from "ollama";

const ollama = new Ollama({
    host: "https://ollama.com",
    headers: {
        Authorization: "Bearer 3b7b34eb1c2e4b9aa74d9f4d6af7ceef.SIrejJrFgPaHKiFWam19V3MY",
    },
});

export const generateCourseRoadmap = async (topic, level, goal) => {
    const prompt = `
        Act as an expert curriculum designer. 
        Create a structured course syllabus for learning "${topic}" at a "${level}" level. 
        The specific goal of this course is: "${goal}".
        
        Return STRICT JSON format ONLY. Do not strictly output any other text or markdown code blocks.
        The JSON structure must be exactly:
        {
            "title": "Course Title",
            "modules": [
                {
                    "title": "Module Title",
                    "chapters": [
                        {
                            "title": "Chapter Title",
                            "keyConcepts": ["Concept 1", "Concept 2"]
                        }
                    ]
                }
            ]
        }
    `;

    try {
        const response = await ollama.chat({
            model: "gpt-oss:120b-cloud",
            messages: [{ role: "user", content: prompt }],
            stream: false,
            format: "json"
        });

        const content = response.message.content;

        // Basic JSON extraction if markdown block is present
        const jsonStartIndex = content.indexOf('{');
        const jsonEndIndex = content.lastIndexOf('}');

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
            const jsonString = content.substring(jsonStartIndex, jsonEndIndex + 1);
            return JSON.parse(jsonString);
        } else {
            throw new Error("Failed to parse JSON from AI response");
        }

    } catch (error) {
        console.error("AI Generation Error:", error);
        throw error;
    }
};

export const generateChapterContent = async (topic, chapterTitle, keyConcepts) => {
    const prompt = `
        Act as an expert tutor.
        Write a comprehensive educational lesson for the chapter "${chapterTitle}" which is part of a course on "${topic}".
        Cover the following key concepts in detail: ${keyConcepts}.
        
        Structure your response in Markdown format:
        - Use clear headings.
        - Explain concepts simply but deeply (Feynman technique).
        - Provide code examples (if applicable) in correct markdown code blocks.
        - key takeaway at the end.
        
        Return ONLY the Markdown content.
    `;

    try {
        const response = await ollama.chat({
            model: "gpt-oss:120b-cloud",
            messages: [{ role: "user", content: prompt }],
            stream: false,
        });

        return response.message.content;
    } catch (error) {
        console.error("AI Content Generation Error:", error);
        throw error;
    }
};

export const generateQuiz = async (topic, level) => {
    const prompt = `
        Act as an expert examiner.
        Create a short quiz (3 multiple choice questions) to test knowledge on "${topic}" at a "${level}" level.
        
        Return STRICT JSON format ONLY.
        Structure:
        {
            "questions": [
                {
                    "question": "Question text",
                    "options": ["A", "B", "C", "D"],
                    "correctAnswer": "The correct option text exactly",
                    "explanation": "Why it is correct"
                }
            ]
        }
    `;

    try {
        const response = await ollama.chat({
            model: "gpt-oss:120b-cloud",
            messages: [{ role: "user", content: prompt }],
            stream: false,
            format: "json"
        });

        return JSON.parse(response.message.content);
    } catch (error) {
        console.error("AI Quiz Generation Error:", error);
        throw error;
    }
};
