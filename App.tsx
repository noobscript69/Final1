
import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TextStudio from './components/TextStudio';
import ImageStudio from './components/ImageStudio';
import VoiceStudio from './components/VoiceStudio';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl border-white/5 space-y-4 hover:border-blue-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <h3 className="text-xl font-bold">Smart Drafting</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Advanced text generation using Gemini 3 Flash for speed and intelligence.</p>
            </div>
            
            <div className="glass p-8 rounded-3xl border-white/5 space-y-4 hover:border-pink-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                <i className="fa-solid fa-palette"></i>
              </div>
              <h3 className="text-xl font-bold">Creative Vision</h3>
              <p className="text-gray-400 text-sm leading-relaxed">State-of-the-art image synthesis with native multimodal grounding.</p>
            </div>

            <div className="glass p-8 rounded-3xl border-white/5 space-y-4 hover:border-purple-500/30 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                <i className="fa-solid fa-microphone-lines"></i>
              </div>
              <h3 className="text-xl font-bold">Natural Voice</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Low-latency audio streaming for real-time human-AI collaboration.</p>
            </div>
          </div>
        </section>

        <TextStudio />
        <ImageStudio />
        <VoiceStudio />
      </main>

      <footer className="py-20 px-6 border-t border-white/5 bg-[#010307]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-sparkles text-white text-[10px]"></i>
              </div>
              <span className="text-lg font-bold">Aetheris<span className="text-blue-500">AI</span></span>
            </div>
            <p className="text-gray-500 text-sm">Building the future of creative intelligence, one prompt at a time.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fa-brands fa-discord"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-sm text-gray-600">
          <p>&copy; 2025 Aetheris AI Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
