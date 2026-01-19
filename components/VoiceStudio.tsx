
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decodeAudio, decodeAudioData, encodeAudio } from '../services/geminiService';

const VoiceStudio: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Standby');
  const [transcript, setTranscript] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      setStatus('Initializing...');
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('Listening...');
            setIsActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            processorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const base64 = encodeAudio(new Uint8Array(int16.buffer));
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({
                  media: {
                    data: base64,
                    mimeType: 'audio/pcm;rate=16000'
                  }
                });
              });
            };
            
            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: any) => {
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => prev + ' ' + message.serverContent.outputTranscription.text);
            }

            const base64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64 && outAudioContextRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outAudioContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(
                decodeAudio(base64),
                outAudioContextRef.current,
                24000,
                1
              );
              const source = outAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outAudioContextRef.current.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
            
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live Error:', e);
            setStatus('Connection Error');
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
            setStatus('Disconnected');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: 'You are a friendly, quick-witted AI companion named Aetheris. Keep responses concise and engaging for a voice conversation.'
        }
      });
      
      sessionRef.current = await sessionPromise;

    } catch (err) {
      console.error(err);
      setStatus('Access Denied');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      // sessionRef.current.close() - Note: Close if API supports it
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
    audioContextRef.current?.close();
    outAudioContextRef.current?.close();
    setIsActive(false);
    setStatus('Standby');
  };

  return (
    <section id="voice" className="py-20 px-6 bg-[#030712]">
      <div className="max-w-4xl mx-auto glass p-10 rounded-[3rem] border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
        <h2 className="text-4xl font-bold mb-4">Live <span className="text-purple-500">Voice</span></h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          Experience zero-latency multimodal interaction. Speak naturally with the most advanced Gemini models.
        </p>

        <div className="relative inline-block mb-10">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-blue-600 scale-110 shadow-[0_0_50px_rgba(37,99,235,0.4)]' : 'bg-white/5 border border-white/20'}`}>
            <i className={`fa-solid ${isActive ? 'fa-microphone text-4xl text-white' : 'fa-microphone-slash text-4xl text-gray-600'}`}></i>
          </div>
          
          {isActive && (
            <>
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-500/30 animate-ping"></div>
              <div className="absolute -top-4 -right-4 bg-red-500 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">LIVE</div>
            </>
          )}
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 mb-2">Current Status</p>
          <div className="text-2xl font-semibold tracking-wide text-white">{status}</div>
        </div>

        <button
          onClick={isActive ? stopSession : startSession}
          className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 ${isActive ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' : 'bg-white text-black hover:bg-gray-200 shadow-xl'}`}
        >
          {isActive ? 'Disconnect Session' : 'Start Voice Chat'}
        </button>

        {transcript && (
          <div className="mt-12 text-left p-6 bg-black/40 border border-white/5 rounded-2xl max-h-40 overflow-y-auto">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Live Transcript</p>
            <p className="text-gray-400 leading-relaxed italic">"{transcript}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VoiceStudio;
