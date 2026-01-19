
import React, { useState } from 'react';
import { generateText } from '../services/geminiService';

const TextStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const text = await generateText(prompt);
      setResult(text);
    } catch (err) {
      setResult("Error generating response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="writer" className="py-20 px-6 bg-[#050914]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">Smart <span className="text-blue-500">Writer</span></h2>
            <p className="text-gray-400">
              Transform your thoughts into polished articles, creative stories, or complex code snippets with the power of Gemini 3 Flash.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask me anything or give me a writing prompt..."
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute bottom-4 right-4 bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner-third animate-spin"></i>
                  ) : (
                    <i className="fa-solid fa-paper-plane"></i>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 glass rounded-2xl p-8 min-h-[300px] border-white/5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Output Window</span>
              <button 
                onClick={() => navigator.clipboard.writeText(result)}
                className="text-gray-500 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>
            {loading ? (
              <div className="flex-1 flex flex-col space-y-3">
                <div className="h-4 bg-white/5 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-white/5 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-white/5 rounded animate-pulse w-5/6"></div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                {result || "Your generated content will appear here..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextStudio;
