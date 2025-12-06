import mongoose from 'mongoose';

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    chapters: [{
        title: { type: String, required: true },
        keyConcepts: [{ type: String }],
        content: { type: String } // Markdown content
    }]
});

const CourseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional for now if no auth
    title: { type: String, required: true },
    topic: { type: String, required: true },
    level: { type: String, required: true },
    goal: { type: String, required: true },
    roadmap: [ModuleSchema],
    createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;