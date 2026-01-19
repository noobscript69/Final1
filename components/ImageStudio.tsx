
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';

const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    setImage(null);
    try {
      const url = await generateImage(prompt);
      setImage(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="studio" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-bold">Visual <span className="text-pink-500">Studio</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Generate high-fidelity artwork from simple descriptions. Powered by Gemini 2.5 Flash Image.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-6">
            <div className="glass p-6 rounded-2xl border-white/10 space-y-4">
              <label className="block text-sm font-medium text-gray-400">Describe your masterpiece</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic neon cityscape, 8k resolution..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                <span>{loading ? "Creating..." : "Generate Image"}</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-xl text-center border-white/5">
                <p className="text-xs text-gray-500 mb-1">Model</p>
                <p className="text-sm font-semibold">Gemini 2.5 Flash</p>
              </div>
              <div className="glass p-4 rounded-xl text-center border-white/5">
                <p className="text-xs text-gray-500 mb-1">Format</p>
                <p className="text-sm font-semibold">1:1 Square</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="aspect-square glass rounded-3xl overflow-hidden relative flex items-center justify-center border-white/10 shadow-2xl shadow-pink-900/10">
              {loading ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-400 animate-pulse">Painting your imagination...</p>
                </div>
              ) : image ? (
                <img src={image} alt="Generated" className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" />
              ) : (
                <div className="text-center text-gray-600 p-8">
                  <i className="fa-solid fa-image text-6xl mb-4 opacity-20"></i>
                  <p>Input a prompt to see the magic happen</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageStudio;
