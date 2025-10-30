
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { generateSpeech } from './services/geminiService';
import { decode, decodeAudioData, audioBufferToWav } from './utils/audioUtils';
import { VOICE_GROUPS } from './constants';
import { Header } from './components/Header';
import { VoiceSelector } from './components/VoiceSelector';
import { StyleInput } from './components/StyleInput';
import { TextInput } from './components/TextInput';
import { GenerateButton } from './components/GenerateButton';
import { AudioPlayer } from './components/AudioPlayer';

const App: React.FC = () => {
  const [text, setText] = useState<string>('Hello! This is a demonstration of the Gemini Text-to-Speech API. You can change this text, select a different voice, and modify the speaking style.');
  const [voice, setVoice] = useState<string>(VOICE_GROUPS[0].voices[0].name);
  const [style, setStyle] = useState<string>('warm and friendly');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on client-side after component mounts
    if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if(AudioContext) {
            audioContextRef.current = new AudioContext({ sampleRate: 24000 });
        }
    }
  }, []);

  const playAudio = useCallback((buffer: AudioBuffer) => {
    if (!audioContextRef.current) return;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  }, []);

  const handleDownload = useCallback(() => {
    if (!audioBuffer) return;

    const wavBlob = audioBufferToWav(audioBuffer);
    const url = URL.createObjectURL(wavBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'gemini-speech.wav';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }, [audioBuffer]);

  const handleGenerateSpeech = async () => {
    if (!text.trim() || !style.trim()) {
      setError('Text and style instructions cannot be empty.');
      return;
    }
    if (!audioContextRef.current) {
        setError('Audio context not available. This browser may not be supported.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setAudioBuffer(null);

    try {
      const prompt = `Say in a ${style} style: ${text}`;
      const base64Audio = await generateSpeech(prompt, voice);
      
      if (base64Audio) {
        const audioBytes = decode(base64Audio);
        const decodedBuffer = await decodeAudioData(audioBytes, audioContextRef.current);
        setAudioBuffer(decodedBuffer);
        playAudio(decodedBuffer);
      } else {
        throw new Error('Received empty audio data from API.');
      }
    } catch (err) {
      console.error('Speech generation failed:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 font-sans p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VoiceSelector selectedVoice={voice} onVoiceChange={setVoice} />
            <StyleInput style={style} onStyleChange={setStyle} />
          </div>
          <TextInput text={text} onTextChange={setText} />
          <div className="flex flex-col sm:flex-row items-center gap-4">
             <GenerateButton isLoading={isLoading} onClick={handleGenerateSpeech} />
             {audioBuffer && !isLoading && (
                <AudioPlayer audioBuffer={audioBuffer} onReplay={() => playAudio(audioBuffer)} onDownload={handleDownload} />
             )}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </main>
        <footer className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
          <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
