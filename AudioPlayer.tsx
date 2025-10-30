
import React from 'react';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { DownloadIcon } from './icons/DownloadIcon';


interface AudioPlayerProps {
  audioBuffer: AudioBuffer | null;
  onReplay: () => void;
  onDownload: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBuffer, onReplay, onDownload }) => {
  if (!audioBuffer) return null;

  return (
    <div className="flex items-center gap-2">
        <button
            onClick={onReplay}
            className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
        >
            <VolumeUpIcon className="-ml-1 mr-2 h-5 w-5" />
            Replay
        </button>
        <button
            onClick={onDownload}
            className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
        >
            <DownloadIcon className="-ml-1 mr-2 h-5 w-5" />
            Download
        </button>
        <span className="text-sm text-slate-500 dark:text-slate-400 pl-2">
            Duration: {audioBuffer.duration.toFixed(2)}s
        </span>
    </div>
  );
};
