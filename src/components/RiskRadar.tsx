import React, { useState } from 'react';
import { LegalDocument, RiskItem, InconsistencyItem } from '../types/legal';
import { 
  ShieldAlert, AlertTriangle, CheckCircle, Copy, 
  Check, ArrowRight, Sparkles, Filter, RefreshCw, 
  FileWarning, HelpCircle
} from 'lucide-react';

interface Props {
  document: LegalDocument;
}

export const RiskRadar: React.FC<Props> = ({ document }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Risks' },
    { id: 'termination_lockin', label: 'Lock-ins & Renewal Traps' },
    { id: 'liability_indemnity', label: 'Indemnity & Liability Shifts' },
    { id: 'rights_waiver', label: 'Waiver of Rights & Privacy' },
    { id: 'financial_penalty', label: 'Financial Fees & Liquidated Damages' },
    { id: 'ip_ownership', label: 'IP & Data Rights' },
  ];

  const filteredRisks = document.risks.filter(r => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  const handleCopyCounterOffer = (riskId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(riskId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> CRITICAL EXPOSURE</span>;
      case 'high':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> HIGH RISK</span>;
      case 'medium':
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">MODERATE RISK</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">LOW RISK</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Risk, Obligation & Inconsistency Radar</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              Audit for {document.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Automated scans identified <strong className="text-rose-400 font-semibold">{document.risks.length} high-liability provisions</strong> and <strong className="text-amber-400 font-semibold">{document.inconsistencies.length} internal contract contradictions</strong> that could create legal jeopardy or unbudgeted costs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-lg px-4 py-2 text-center">
              <div className="text-[10px] text-rose-300 uppercase font-mono font-medium">Risk Exposure</div>
              <div className="text-xl font-bold text-rose-400 font-mono">
                {document.overallRiskScore} <span className="text-xs font-sans text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Internal Inconsistencies Radar Card */}
      {document.inconsistencies.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
              <FileWarning className="w-4 h-4 text-amber-400" />
              <span>Internal Document Inconsistency Detected</span>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
              Ambiguity Hazard
            </span>
          </div>

          {document.inconsistencies.map((incon) => (
            <div key={incon.id} className="bg-slate-900/90 border border-amber-500/20 rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-bold text-slate-200">
                {incon.title}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-sans font-semibold text-[11px]">{incon.sectionA}</div>
                  <div className="text-slate-300">"{incon.quoteA}"</div>
                </div>

                <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-sans font-semibold text-[11px]">{incon.sectionB}</div>
                  <div className="text-slate-300">"{incon.quoteB}"</div>
                </div>
              </div>

              <div className="bg-amber-950/40 p-3 rounded border border-amber-900/50 text-xs text-amber-200 leading-relaxed">
                <strong className="text-amber-300">The Legal Hazard:</strong> {incon.conflictAnalysis}
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-indigo-300">Recommended Resolution:</strong> {incon.suggestedClarification}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flagged Risks Cards */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => (
          <div
            key={risk.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden shadow-lg transition-all"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold">
                  {risk.clauseRef}
                </span>
                <span className="font-semibold text-slate-200 text-sm">
                  {risk.title}
                </span>
              </div>

              <div>
                {getSeverityBadge(risk.severity)}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 text-xs">
              {/* Excerpt */}
              <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 font-mono text-slate-300 leading-relaxed">
                <span className="text-slate-500 font-sans block text-[11px] font-semibold mb-1">Clause Excerpt:</span>
                "{risk.originalExcerpt}"
              </div>

              {/* Trap explanation */}
              <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-3.5 space-y-1 text-slate-200 leading-relaxed">
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>The Hidden Trap & Real-World Exposure:</span>
                </div>
                <p className="text-slate-300 text-xs">
                  {risk.hiddenTrapExplanation}
                </p>
              </div>

              {/* Mitigation Advice */}
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-3.5 space-y-1 text-slate-200 leading-relaxed">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>How to Mitigate & Protect Yourself:</span>
                </div>
                <p className="text-slate-300 text-xs">
                  {risk.mitigationRecommendation}
                </p>
              </div>

              {/* Ready-to-Use Negotiation Counter-Offer */}
              {risk.negotiationCounterOffer && (
                <div className="bg-slate-950 border border-indigo-500/30 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 font-semibold text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Suggested Redline Counter-Offer (Copy & Send to Counterparty):
                    </span>
                    <button
                      onClick={() => handleCopyCounterOffer(risk.id, risk.negotiationCounterOffer!)}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
                    >
                      {copiedId === risk.id ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === risk.id ? 'Copied Wording' : 'Copy Counter-Proposal'}</span>
                    </button>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-indigo-900/40 font-mono text-indigo-200 text-xs select-text">
                    "{risk.negotiationCounterOffer}"
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
