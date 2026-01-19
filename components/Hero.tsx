
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-blue-400">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Powered by Gemini 3 Pro & Flash</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Unlock the Infinite Potential of <span className="gradient-text">Multimodal AI</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Create breathtaking imagery, engage in human-like conversations, and generate professional content instantly. One interface, unlimited possibilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#writer" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center space-x-2">
            <span>Start Creating</span>
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </a>
          <button className="w-full sm:w-auto px-8 py-4 glass border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
