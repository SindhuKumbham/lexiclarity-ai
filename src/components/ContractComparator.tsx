import React, { useState } from 'react';
import { SAMPLE_COMPARISON } from '../data/sampleDocuments';
import { ClauseDiff } from '../types/legal';
import { 
  GitCompare, AlertTriangle, ArrowRight, ShieldAlert, 
  Check, Copy, Sparkles, PlusCircle, MinusCircle, 
  HelpCircle, Scale
} from 'lucide-react';
import { queryLegalAi } from '../services/legalAiService';

export const ContractComparator: React.FC = () => {
  const comparison = SAMPLE_COMPARISON;
  const [filter, setFilter] = useState<'all' | 'critical' | 'financial'>('all');
  const [copied, setCopied] = useState(false);
  const [aiCustomDiff, setAiCustomDiff] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const filteredDiffs = comparison.diffs.filter(d => {
    if (filter === 'critical') return d.favorability === 'critical_risk';
    if (filter === 'financial') return d.impactAnalysis.includes('$') || d.impactAnalysis.includes('%');
    return true;
  });

  const handleCopySummary = () => {
    const text = `CONTRACT COMPARISON SUMMARY:
Document A: ${comparison.docATitle}
Document B: ${comparison.docBTitle}
Variance Score: ${comparison.varianceScore}/100
Key Critical Traps:
${comparison.diffs.map(d => `- [${d.clauseTitle}] ${d.impactAnalysis} (Trap: ${d.sneakyAlert || 'N/A'})`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runAiVarianceDeepDive = async () => {
    setIsComparing(true);
    const res = await queryLegalAi({
      action: 'compare',
      prompt: `Provide a strategic comparison and counter-negotiation brief between "${comparison.docATitle}" and "${comparison.docBTitle}". Focus especially on how the tenant can push back against the stripped parking and shortened grace period.`,
      context: JSON.stringify(comparison.diffs)
    });
    setAiCustomDiff(res.text);
    setIsComparing(false);
  };

  return (
    <div className="space-y-6">
      {/* Comparator Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <GitCompare className="w-4 h-4" />
              <span>Multi-Document Side-by-Side Variance Engine</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              {comparison.docATitle} <span className="text-slate-500 font-normal">vs</span> {comparison.docBTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {comparison.summary}
            </p>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
            <div className="bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Total Variance</div>
              <div className="text-xl font-bold text-amber-400 font-mono">
                {comparison.varianceScore}% <span className="text-xs text-rose-400 font-sans font-semibold">Shift</span>
              </div>
            </div>
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Summary' : 'Copy Variance Brief'}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Filter Changes:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Revisions ({comparison.diffs.length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'critical'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Sneaky Traps ({comparison.criticalAlertCount})
            </button>
            <button
              onClick={() => setFilter('financial')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'financial'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Financial / Price Hikes
            </button>
          </div>

          <button
            onClick={runAiVarianceDeepDive}
            disabled={isComparing}
            className="text-xs px-3 py-1 bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-700/50 text-indigo-300 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isComparing ? 'Analyzing...' : 'Generate Counter-Strategy'}</span>
          </button>
        </div>
      </div>

      {/* AI Deep Dive Result if triggered */}
      {aiCustomDiff && (
        <div className="p-4 bg-slate-900 border border-indigo-500/40 rounded-xl text-xs leading-relaxed text-slate-200 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI Counter-Negotiation Strategy for Lease Renewal</span>
          </div>
          <div className="whitespace-pre-line text-slate-300">
            {aiCustomDiff}
          </div>
        </div>
      )}

      {/* Diff Table / Cards */}
      <div className="space-y-4">
        {filteredDiffs.map((diff) => (
          <div
            key={diff.clauseId}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                  {diff.clauseTitle}
                </span>
                {diff.changeType === 'modified' && (
                  <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/60 flex items-center gap-1">
                    <Scale className="w-3 h-3" /> Modified Terms
                  </span>
                )}
                {diff.changeType === 'removed' && (
                  <span className="text-[11px] font-semibold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900/60 flex items-center gap-1">
                    <MinusCircle className="w-3 h-3" /> Stripped Amenity
                  </span>
                )}
                {diff.changeType === 'added' && (
                  <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60 flex items-center gap-1">
                    <PlusCircle className="w-3 h-3" /> Newly Added Clause
                  </span>
                )}
              </div>

              <div>
                {diff.favorability === 'critical_risk' && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Severe Tenant Trap
                  </span>
                )}
                {diff.favorability === 'favors_doc_a' && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Favors Original (Renewal is Worse)
                  </span>
                )}
              </div>
            </div>

            {/* Split Comparison Columns */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/40">
              {/* Doc A */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                  <span>{comparison.docATitle}</span>
                  <span className="text-slate-500 font-mono text-[10px]">Previous Version</span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-800/80 leading-relaxed">
                  {diff.docAText}
                </p>
              </div>

              {/* Doc B */}
              <div className="bg-slate-900/90 border border-indigo-900/40 rounded-lg p-3 space-y-1.5">
                <div className="text-[11px] font-semibold text-indigo-400 flex items-center justify-between">
                  <span>{comparison.docBTitle}</span>
                  <span className="text-indigo-400/80 font-mono text-[10px]">New Proposed Terms</span>
                </div>
                <p className="text-xs text-indigo-200 font-mono bg-indigo-950/30 p-2.5 rounded border border-indigo-900/60 leading-relaxed">
                  {diff.docBText}
                </p>
              </div>
            </div>

            {/* Impact & Sneaky Alert Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <span className="font-semibold text-slate-300 shrink-0">Real-World Financial & Legal Impact:</span>
                <span className="text-slate-400">{diff.impactAnalysis}</span>
              </div>

              {diff.sneakyAlert && (
                <div className="bg-rose-950/30 border border-rose-800/40 rounded-lg p-2.5 flex items-start gap-2 text-xs text-rose-200">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-300 font-semibold">Hidden Risk / Erosion of Rights:</strong>{' '}
                    <span>{diff.sneakyAlert}</span>
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
