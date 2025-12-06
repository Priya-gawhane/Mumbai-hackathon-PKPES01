import Link from "next/link";
import { ArrowRight, Brain, Zap, Target, BookOpen } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]" />
            </div>

            <main className="relative z-10 pt-32 pb-16">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 text-center mb-32">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                        Connect your mind to AI
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Master Any Skill <br />
                        <span className="text-white">In Record Time.</span>
                    </h1>
                    
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Generate personalized, interactive learning paths powered by advanced AI. 
                        Stop searching, start learning.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/courses/create"
                            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                        >
                            Start Learning Free <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link 
                            href="#demo"
                            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-white"
                        >
                            View Demo
                        </Link>
                    </div>

                    {/* Stats / Social Proof */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 text-gray-500">
                        <div className="flex items-center gap-2">
                             <div className="flex -space-x-2">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black" />
                                ))}
                            </div>
                            <span className="text-sm">Trusted by 10,000+ Learners</span>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="max-w-7xl mx-auto px-6 mb-32">
                    <h2 className="text-3xl font-bold text-center mb-16">Why Learn with EduAI?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Brain className="w-8 h-8 text-purple-400" />}
                            title="AI-Powered Curricula"
                            description="Forget generic courses. Get a syllabus tailored exactly to your current level and goals."
                        />
                        <FeatureCard 
                            icon={<Target className="w-8 h-8 text-blue-400" />}
                            title="Interactive Roadmaps"
                            description="Visualize your journey. Track progress through modules and chapters with a dynamic timeline."
                        />
                        <FeatureCard 
                            icon={<Zap className="w-8 h-8 text-yellow-400" />}
                            title="Instant Content"
                            description="Click any topic to generate instant, easy-to-understand explanations and examples."
                        />
                    </div>
                </section>

                {/* How it Works */}
                <section id="how-it-works" className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="bg-[#111] border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[64px]" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Learning Adapted to You</h2>
                                <div className="space-y-8">
                                    <Step 
                                        number="01" 
                                        title="Set Your Goal" 
                                        desc="Tell our AI what you want to learn (e.g. 'React js' or 'Machine Learning')."
                                    />
                                    <Step 
                                        number="02" 
                                        title="Get Your Roadmap" 
                                        desc="We generate a complete structured syllabus broken down into manageable modules."
                                    />
                                    <Step 
                                        number="03" 
                                        title="Master Concepts" 
                                        desc="Dive into each chapter with AI-generated guides, quizzes, and code."
                                    />
                                </div>
                            </div>
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-6 h-[400px] flex items-center justify-center">
                                {/* Placeholder for a mockup image or interactive component */}
                                <div className="text-center">
                                    <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-500">Interactive Preview of Roadmap</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to accelerate your learning?</h2>
                    <p className="text-gray-400 mb-8">Join thousands of students mastering new skills today.</p>
                    <Link 
                        href="/courses/create" 
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg"
                    >
                        Generate Your First Course
                    </Link>
                </section>
            </main>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 bg-[#111] border border-white/5 rounded-2xl hover:border-white/10 transition-colors group">
            <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <span className="text-2xl font-bold text-gray-700">{number}</span>
            <div>
                <h4 className="text-lg font-bold mb-1">{title}</h4>
                <p className="text-gray-400 text-sm">{desc}</p>
            </div>
        </div>
    );
}
