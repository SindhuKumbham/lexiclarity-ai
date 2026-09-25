import React, { useState } from 'react';
import { ShieldAlert, Info, X, ChevronRight, Scale } from 'lucide-react';

interface Props {
  jurisdiction: string;
  onJurisdictionChange: (jurisdiction: string) => void;
}

export const LegalDisclaimerBanner: React.FC<Props> = ({ jurisdiction, onJurisdictionChange }) => {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/30 border-y border-amber-500/20 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Scale className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-amber-200">Legal Information & Accessibility Notice:</span>{' '}
            <span className="text-slate-300">
              LexiClarity provides automated document analysis and educational assistance to improve legal literacy. This does <strong className="text-amber-300 font-semibold">not</strong> constitute formal legal advice, representation, or an attorney-client relationship.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 text-slate-300">
            <span className="text-[11px] text-slate-400 font-medium">Jurisdiction:</span>
            <select
              value={jurisdiction}
              onChange={(e) => onJurisdictionChange(e.target.value)}
              className="bg-transparent text-amber-300 font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="State of New York / Standard US Urban" className="bg-slate-900 text-slate-200">New York (US)</option>
              <option value="State of California" className="bg-slate-900 text-slate-200">California (US)</option>
              <option value="State of Delaware" className="bg-slate-900 text-slate-200">Delaware (Commercial)</option>
              <option value="United States Federal / General Common Law" className="bg-slate-900 text-slate-200">US General</option>
              <option value="United Kingdom (England & Wales)" className="bg-slate-900 text-slate-200">United Kingdom</option>
              <option value="European Union (GDPR / Consumer Directives)" className="bg-slate-900 text-slate-200">European Union</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
