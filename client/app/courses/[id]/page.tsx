"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, BookOpen, CheckCircle2, Circle, ChevronDown, ChevronRight, Share2, Award, X, Sparkles } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuizModal from "@/components/QuizModal";

interface Chapter {
    _id: string;
    title: string;
    keyConcepts: string[];
    content?: string;
}

interface Module {
    title: string;
    chapters: Chapter[];
}

interface Course {
    _id: string;
    title: string;
    topic: string;
    level: string;
    goal: string;
    roadmap: Module[];
}

export default function CoursePage() {
    const params = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedModules, setExpandedModules] = useState<number[]>([0]); 
    
    // Content Viewer State
    const [selectedChapter, setSelectedChapter] = useState<{chapterId: string, title: string, content?: string} | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeContent, setActiveContent] = useState<string>("");
    
    // Quiz State
    const [quizTopic, setQuizTopic] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/courses/${params.id}`);
                if (!res.ok) throw new Error("Course not found");
                const data = await res.json();
                setCourse(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchCourse();
        }
    }, [params.id]);

    const toggleModule = (index: number) => {
        setExpandedModules(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };

    const handleChapterClick = async (chapter: Chapter) => {
        setSelectedChapter({ chapterId: chapter._id, title: chapter.title });
        setActiveContent("");
        setIsGenerating(true);

        try {
            const res = await fetch(`http://localhost:3001/api/courses/${params.id}/chapters/${chapter._id}`);
            if (!res.ok) throw new Error("Failed to load content");
            
            const data = await res.json();
            setActiveContent(data.content);
        } catch (error) {
            console.error(error);
            setActiveContent("Failed to load content. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const closeContent = () => {
        setSelectedChapter(null);
        setActiveContent("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <p>Course not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative">
            {/* Header */}
            <div className="bg-[#111] border-b border-gray-800 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
                <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                            <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded-md border border-blue-500/20">{course.level}</span>
                            <span>•</span>
                            <span>{course.topic}</span>
                        </div>
                        <h1 className="text-3xl font-bold">{course.title}</h1>
                        <p className="text-gray-400 mt-1">Goal: {course.goal}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Roadmap Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="space-y-6 relative">
                     {/* Vertical Line */}
                    <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-800" />

                    {course.roadmap.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="relative pl-16">
                            {/* Module Node */}
                            <div 
                                className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-[#1c1c1c] border border-gray-700 z-10 cursor-pointer shadow-lg group hover:border-blue-500/50 transition-colors"
                                onClick={() => toggleModule(moduleIndex)}
                            >
                                <div className="font-bold text-gray-500 group-hover:text-blue-400">{moduleIndex + 1}</div>
                            </div>

                            {/* Module Card */}
                            <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl overflow-hidden shadow-xl transition-all">
                                <div 
                                    className="p-6 cursor-pointer flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                                    onClick={() => toggleModule(moduleIndex)}
                                >
                                    <h2 className="text-xl font-semibold text-white">{module.title}</h2>
                                    {expandedModules.includes(moduleIndex) ? <ChevronDown className="text-gray-500" /> : <ChevronRight className="text-gray-500" />}
                                </div>

                                {/* Chapters */}
                                {expandedModules.includes(moduleIndex) && (
                                    <div className="border-t border-gray-800 bg-[#111]">
                                        <div className="p-6 space-y-6">
                                            {module.chapters.map((chapter, chapterIndex) => (
                                                <div 
                                                    key={chapterIndex} 
                                                    className="flex gap-4 cursor-pointer hover:bg-gray-800/50 p-3 rounded-xl transition-all"
                                                    onClick={() => handleChapterClick(chapter)}
                                                >
                                                    <div className="mt-1">
                                                        <Circle className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-medium text-gray-200 mb-2 group-hover:text-blue-400 transition-colors">{chapter.title}</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {chapter.keyConcepts.map((concept, i) => (
                                                                <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full border border-gray-700">
                                                                    {concept}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen className="w-5 h-5 text-gray-600 hover:text-blue-500" />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="pt-4 border-t border-gray-800">
                                                <button 
                                                    onClick={() => setQuizTopic(module.title)}
                                                    className="w-full py-3 border border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800/30 transition-all flex items-center justify-center gap-2 group"
                                                >
                                                    <Award className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                                                    <span className="font-medium">Take Quiz for {module.title}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quiz Modal */}
            {quizTopic && course && (
                <QuizModal 
                    topic={quizTopic} 
                    level={course.level}
                    onClose={() => setQuizTopic(null)}
                />
            )}

            {/* Content Panel / Modal */}
            {selectedChapter && (
                <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm">
                    <div className="w-full md:w-2/3 lg:w-1/2 h-full bg-[#111] border-l border-gray-800 shadow-2xl p-8 overflow-y-auto relative animate-in slide-in-from-right duration-300">
                        <button 
                            onClick={closeContent}
                            className="absolute top-6 right-6 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>

                        <div className="mb-8 mt-4">
                            <span className="text-sm font-mark uppercase tracking-widest text-blue-500 mb-2 block">Chapter Content</span>
                            <h2 className="text-3xl font-bold text-white">{selectedChapter.title}</h2>
                        </div>

                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                <Sparkles className="w-10 h-10 text-purple-500 animate-pulse" />
                                <p className="text-gray-400 animate-pulse">AI is generating your lesson...</p>
                            </div>
                        ) : (
                            <div className="prose prose-invert max-w-none prose-headings:text-gray-200 prose-p:text-gray-400 prose-code:text-blue-400 prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-gray-800">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {activeContent}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
