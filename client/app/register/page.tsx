"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Loader2, Sparkles, Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
             const res = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                 const data = await res.json();
                 throw new Error(data.message || "Registration failed");
            }

            // Redirect to login on success
            router.push('/login'); 
        } catch (error) {
            console.error(error);
            alert("Registration failed. Please try again.");
        } finally {
             setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
             {/* Background Gradients */}
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
             <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px]" />

            <div className="w-full max-w-md relative z-10">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <div className="bg-[#1c1c1c] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 mb-4 shadow-lg shadow-purple-500/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Create Account</h1>
                        <p className="text-gray-400 mt-2 text-sm">Join thousands of learners today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                                <input 
                                    type="text" 
                                    required
                                    className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-[#111] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
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
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="text-white font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
