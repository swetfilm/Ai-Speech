
import React from 'react';
import { VOICE_GROUPS } from '../constants';

interface VoiceSelectorProps {
  selectedVoice: string;
  onVoiceChange: (voice: string) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({ selectedVoice, onVoiceChange }) => {
  return (
    <div>
      <label htmlFor="voice" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        Voice
      </label>
      <select
        id="voice"
        value={selectedVoice}
        onChange={(e) => onVoiceChange(e.target.value)}
        className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition"
      >
        {VOICE_GROUPS.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.description})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
