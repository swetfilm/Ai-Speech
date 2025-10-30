
import React from 'react';

interface StyleInputProps {
  style: string;
  onStyleChange: (style: string) => void;
}

export const StyleInput: React.FC<StyleInputProps> = ({ style, onStyleChange }) => {
  return (
    <div>
      <label htmlFor="style" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Speaking Style
      </label>
      <input
        type="text"
        id="style"
        value={style}
        onChange={(e) => onStyleChange(e.target.value)}
        placeholder="e.g., cheerful and energetic"
        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
      />
    </div>
  );
};
