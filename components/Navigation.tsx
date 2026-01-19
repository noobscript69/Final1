
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center animate-glow">
            <i className="fa-solid fa-sparkles text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">Aetheris<span className="text-blue-500">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#writer" className="hover:text-white transition-colors">Smart Writer</a>
          <a href="#studio" className="hover:text-white transition-colors">Visual Studio</a>
          <a href="#voice" className="hover:text-white transition-colors">Live Voice</a>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-900/20 active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
