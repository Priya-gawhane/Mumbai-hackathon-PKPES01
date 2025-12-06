import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            EduAI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Pricing
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/courses/create"
            className="px-4 py-2 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
          >
            Get Started
          </Link>
          <button className="md:hidden text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
