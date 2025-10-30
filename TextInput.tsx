
import React from 'react';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ text, onTextChange }) => {
  return (
    <div>
      <label htmlFor="text-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Text to Synthesize
      </label>
      <textarea
        id="text-input"
        rows={6}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Enter text here..."
        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
      />
    </div>
  );
};
