import React, { useState } from 'react';
import { BookOpen, HelpCircle } from 'lucide-react';
import { JargonDefinition } from '../types/legal';

interface Props {
  term: string;
  definition: string;
  plainMeaning: string;
}

export const JargonTooltip: React.FC<Props> = ({ term, definition, plainMeaning }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 hover:text-indigo-200 text-xs font-mono font-medium transition-colors cursor-help"
      >
        <span>{term}</span>
        <HelpCircle className="w-2.5 h-2.5 text-indigo-400 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 border border-indigo-500/40 rounded-lg shadow-2xl text-left pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-xs mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Legal Jargon Decoded</span>
          </div>
          <div className="text-slate-100 font-medium text-xs mb-1">
            {term}
          </div>
          <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
            {definition}
          </p>
          <div className="bg-indigo-950/40 border border-indigo-900/60 rounded p-1.5 text-[11px] text-indigo-200">
            <strong className="text-indigo-300 font-semibold">Plain English:</strong> {plainMeaning}
          </div>
          <div className="w-2 h-2 bg-slate-900 border-r border-b border-indigo-500/40 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}
    </span>
  );
};
