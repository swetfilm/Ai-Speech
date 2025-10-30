
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3">
        <SparklesIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Gemini Text-to-Speech
        </h1>
      </div>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
        Bring your text to life with natural-sounding AI voices.
      </p>
    </header>
  );
};
