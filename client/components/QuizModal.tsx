"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, XCircle, AlertCircle, ArrowRight } from "lucide-react";

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface QuizProps {
    topic: string;
    level: string;
    onClose: () => void;
}

export default function QuizModal({ topic, level, onClose }: QuizProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [error, setError] = useState("");

    // Generate Quiz on Mount
    useState(() => {
        const fetchQuiz = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/quizzes/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ topic, level })
                });
                
                if (!res.ok) throw new Error("Failed to generate quiz");
                
                const data = await res.json();
                if (data.questions && data.questions.length > 0) {
                     setQuestions(data.questions);
                } else {
                    throw new Error("Invalid quiz format");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load quiz. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    });

    const handleAnswer = (option: string) => {
        if (isAnswered) return;
        
        setSelectedOption(option);
        setIsAnswered(true);

        if (option === questions[currentQuestion].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResult(true);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="bg-[#1c1c1c] border border-gray-800 p-8 rounded-2xl flex flex-col items-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                    <p className="text-gray-400">Generating Quiz for {topic}...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                 <div className="bg-[#1c1c1c] border border-red-900/50 p-8 rounded-2xl flex flex-col items-center max-w-md text-center">
                    <AlertCircle className="w-10 h-10 text-red-500 mb-4" />
                    <p className="text-white mb-6">{error}</p>
                    <button onClick={onClose} className="px-6 py-2 bg-gray-800 rounded-full hover:bg-gray-700">Close</button>
                </div>
            </div>
        );
    }

    if (showResult) {
        const percentage = (score / questions.length) * 100;
        const passed = percentage >= 80;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-[#1c1c1c] border border-gray-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative">
                    <div className="text-center">
                        {passed ? (
                             <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                             </div>
                        ) : (
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-10 h-10 text-red-500" />
                             </div>
                        )}
                       
                        <h2 className="text-3xl font-bold mb-2">{passed ? "Knowledge Check Passed!" : "Keep Practicing"}</h2>
                        <p className="text-gray-400 mb-8">You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)</p>

                        {!passed && (
                            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-left mb-8">
                                <h4 className="text-blue-400 font-bold mb-1 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4" /> Remedial Plan
                                </h4>
                                <p className="text-sm text-gray-300">We recommend reviewing the key concepts in this module before moving forward.</p>
                            </div>
                        )}

                        <button 
                            onClick={onClose}
                            className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Back to Roadmap
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-[#1c1c1c] border border-gray-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#111]">
                    <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</span>
                        <h3 className="text-xl font-bold mt-1 text-white">{topic} Quiz</h3>
                    </div>
                     <button onClick={onClose} className="text-gray-500 hover:text-white">Close</button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1">
                    <h2 className="text-lg md:text-xl font-medium mb-8 leading-relaxed">
                        {question.question}
                    </h2>

                    <div className="space-y-3">
                        {question.options.map((option, idx) => {
                            const isSelected = selectedOption === option;
                            const isCorrect = option === question.correctAnswer;
                            const showCorrect = isAnswered && isCorrect;
                            const showWrong = isAnswered && isSelected && !isCorrect;

                            let baseClasses = "w-full p-4 rounded-xl text-left border transition-all flex justify-between items-center group ";
                            if (showCorrect) baseClasses += "bg-green-500/10 border-green-500/50 text-green-400";
                            else if (showWrong) baseClasses += "bg-red-500/10 border-red-500/50 text-red-400";
                            else if (isSelected) baseClasses += "bg-blue-500/10 border-blue-500 text-blue-400";
                            else baseClasses += "bg-[#111] border-gray-800 hover:border-gray-600 text-gray-300";

                            return (
                                <button
                                    key={idx}
                                    disabled={isAnswered}
                                    onClick={() => handleAnswer(option)}
                                    className={baseClasses}
                                >
                                    <span className="font-medium">{option}</span>
                                    {showCorrect && <CheckCircle2 className="w-5 h-5" />}
                                    {showWrong && <XCircle className="w-5 h-5" />}
                                </button>
                            );
                        })}
                    </div>

                    {isAnswered && (
                        <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700 animate-in slide-in-from-bottom-2">
                             <h4 className="font-bold text-sm text-gray-400 mb-1 uppercase">Explanation</h4>
                             <p className="text-gray-300 text-sm leading-relaxed">{question.explanation}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800 bg-[#111] flex justify-end">
                    <button 
                        onClick={nextQuestion}
                        disabled={!isAnswered}
                        className="px-8 py-3 bg-white text-black font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
