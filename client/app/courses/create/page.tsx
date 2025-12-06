"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";

export default function CreateCoursePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        topic: "",
        level: "Beginner",
        goal: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch("http://localhost:3001/api/courses/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to generate course");

            const data = await res.json();
            router.push(`/courses/${data._id}`);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#1c1c1c] border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-4 text-blue-400">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Course Generator
                    </h1>
                    <p className="text-gray-400 mt-2">
                        AI-powered learning paths tailored just for you.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            What do you want to learn?
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. React.js, Quantum Computing..."
                            className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            value={formData.topic}
                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Current Level
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {["Beginner", "Intermediate", "Advanced"].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, level })}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                                        formData.level === level
                                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                            : "bg-[#111] border-gray-700 text-gray-400 hover:bg-gray-800"
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            What is your goal?
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Build a Job Portal, Get Hired..."
                            className="w-full bg-[#111] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating Roadmap...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Learning Path
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
