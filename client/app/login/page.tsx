"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Loader2, Sparkles, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Integrate with actual Auth API
        // For now, simulate delay and redirect
        setTimeout(() => {
            setIsLoading(false);
            router.push('/'); 
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
             {/* Background Gradients */}
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md relative z-10">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 mb-4 shadow-lg shadow-blue-500/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                        <p className="text-gray-400 mt-2 text-sm">Sign in to continue your learning journey.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-white font-medium hover:underline">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
