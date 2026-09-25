import React, { useState } from 'react';
import { LegalDocument, SimplifiedClause } from '../types/legal';
import { JargonTooltip } from './JargonTooltip';
import { 
  BookOpen, Sparkles, AlertTriangle, CheckCircle2, 
  ArrowRight, ShieldAlert, FileText, ChevronDown, 
  ChevronUp, Scale, Zap, Info
} from 'lucide-react';
import { queryLegalAi } from '../services/legalAiService';
import { SUPPORTED_LANGUAGES, SupportedLanguage, CLAUSE_TRANSLATIONS } from '../data/translations';
import { Globe } from 'lucide-react';

interface Props {
  document: LegalDocument;
}

export const DocumentSimplifier: React.FC<Props> = ({ document }) => {
  const [viewMode, setViewMode] = useState<'split' | 'accordion'>('accordion');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('en');
  const [expandedClauses, setExpandedClauses] = useState<Record<string, boolean>>({
    'cl-lease-1': true,
    'cl-lease-2': true,
    'cl-lease-3': true,
    'cl-lease-4': true,
  });
  const [customQuery, setCustomQuery] = useState('');
  const [customAiResult, setCustomAiResult] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const toggleClause = (id: string) => {
    setExpandedClauses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCustomSimplify = async () => {
    if (!customQuery.trim()) return;
    setIsLoadingAi(true);
    setCustomAiResult(null);

    const res = await queryLegalAi({
      action: 'simplify',
      prompt: `Translate this specific legal excerpt or question into simple 8th-grade plain English. Highlight key obligations, who it favors, and hidden traps: "${customQuery}"`,
      documentText: document.fullText
    });

    setCustomAiResult(res.text);
    setIsLoadingAi(false);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Critical Risk</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> High Risk</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Moderate Risk</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Standard / Low</span>;
    }
  };

  const getFavorabilityBadge = (favors: string) => {
    switch (favors) {
      case 'heavily_one_sided':
        return <span className="text-[11px] font-medium text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/60">Heavily One-Sided (Trap)</span>;
      case 'counterparty':
        return <span className="text-[11px] font-medium text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/60">Favors Counterparty</span>;
      case 'balanced':
        return <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">Balanced Terms</span>;
      default:
        return <span className="text-[11px] font-medium text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/60">Favors You</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Readability & Complexity Scoreboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Reading Level Required</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            Grade {document.fleschKincaidGrade}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {document.fleschKincaidGrade > 16 ? 'Post-Graduate / Attorney Level' : 'High School Level'}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Legalese Density</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-300 font-mono">
            {document.legaleseDensityPercent}%
          </div>
          <div className="text-[11px] text-amber-400/80 mt-1">
            Heavy archaic & boilerplate jargon
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Calculated Risk Score</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400 font-mono">{document.overallRiskScore}</span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <div className="text-[11px] text-rose-400/80 mt-1">
            High-risk exposure to tenant/user
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Document Length</span>
            <Scale className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {document.wordCount.toLocaleString()} <span className="text-xs font-normal text-slate-400">words</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            ~{Math.round(document.wordCount / 180)} min estimated reading time
          </div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-indigo-500/20 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Executive Plain-English Summary</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-2">
          {document.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {document.executiveSummary}
        </p>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-medium text-slate-300">Parties:</span> {document.partyA} vs {document.partyB}
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-medium text-slate-300">Jurisdiction:</span> {document.jurisdiction}
          </div>
        </div>
      </div>

      {/* Controls & View Mode Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
        <div>
          <h4 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <span>Clause-by-Clause Simplification & Obligation Breakdown</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-mono">
              {document.clauses.length} key clauses
            </span>
          </h4>
          <p className="text-xs text-slate-400">
            Each section translated from intimidating legalese into direct, plain-English implications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
          {/* Regional Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-[11px] text-slate-400 hidden sm:inline">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-indigo-300 font-medium text-xs focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-200">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('accordion')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === 'accordion'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Stacked View
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                viewMode === 'split'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side Diff
            </button>
          </div>
        </div>
      </div>

      {/* Clauses Content */}
      <div className="space-y-4">
        {document.clauses.map((clause) => {
          const isExpanded = expandedClauses[clause.id] !== false;

          return (
            <div
              key={clause.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl overflow-hidden transition-all shadow-md"
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleClause(clause.id)}
                className="p-4 bg-slate-900/90 flex items-center justify-between cursor-pointer select-none border-b border-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold">
                    {clause.clauseNumber}
                  </span>
                  <span className="font-medium text-slate-200 text-sm">
                    {clause.sectionTitle}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {getRiskBadge(clause.riskLevel)}
                  {getFavorabilityBadge(clause.favorsParty)}
                  <button className="text-slate-400 hover:text-slate-200 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Body */}
              {isExpanded && (() => {
                const trans = CLAUSE_TRANSLATIONS[clause.id]?.[selectedLanguage];
                const displayText = trans?.plainText || clause.plainEnglishText;
                const displayObligation = trans?.obligation || clause.keyObligation;
                const displayAdvice = trans?.advice || clause.practicalAdvice;

                return (
                <div className="p-5 space-y-4">
                  {viewMode === 'split' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Original Legalese */}
                      <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            Original Contract Legalese
                          </span>
                          <span className="text-[10px] text-rose-400/90 bg-rose-950/50 px-1.5 py-0.5 rounded">Intimidating / Complex</span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/50 p-2.5 rounded border border-slate-800/50 select-text">
                          "{clause.originalText}"
                        </p>
                      </div>

                      {/* Right: Plain English */}
                      <div className="bg-indigo-950/20 border border-indigo-900/40 rounded-lg p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                            8th-Grade Plain English Translation
                          </span>
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded">Crystal Clear</span>
                        </div>
                        <p className="text-xs text-slate-100 leading-relaxed font-medium bg-slate-900/70 p-2.5 rounded border border-indigo-800/30 select-text">
                          {displayText}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Original Excerpt */}
                      <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                        <div className="text-[11px] text-slate-500 font-sans mb-1 font-medium">Original Contract Excerpt:</div>
                        "{clause.originalText}"
                      </div>

                      {/* Plain English Translation */}
                      <div className="bg-indigo-950/30 border border-indigo-900/50 p-3.5 rounded-lg text-xs leading-relaxed text-indigo-100">
                        <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>What This Actually Means:</span>
                        </div>
                        <p className="font-medium text-slate-100 text-sm leading-relaxed">
                          {displayText}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Obligations & Advice Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-950/70 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Your Strict Legal Obligation:</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {displayObligation}
                      </p>
                    </div>

                    <div className="bg-slate-950/70 border border-emerald-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tactical Action Advice:</span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {displayAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Jargon Glossary Tags if any */}
                  {clause.jargonTerms.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
                      <span className="text-slate-400 font-medium text-[11px]">Decoded Jargon:</span>
                      {clause.jargonTerms.map((jargon, idx) => (
                        <JargonTooltip
                          key={idx}
                          term={jargon.term}
                          definition={jargon.definition}
                          plainMeaning={jargon.plainMeaning}
                        />
                      ))}
                    </div>
                  )}
                </div>
                );
              })()}
            </div>
          );
        })}
      </div>

      {/* Live AI Clause Simplifier Tool */}
      <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>Instant Clause Simplifier & Jargon Decoder (Gemini-Powered)</span>
        </div>
        <p className="text-xs text-slate-300">
          Have another confusing clause, addendum snippet, or email from the counterparty? Paste it below to translate it into plain English with identified risks immediately.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            rows={2}
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Paste any confusing legal sentence here (e.g. 'Party B shall indemnify and save harmless Party A against any consequential or punitive damages...')"
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleCustomSimplify}
            disabled={isLoadingAi || !customQuery.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            {isLoadingAi ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simplify Now</span>
              </>
            )}
          </button>
        </div>

        {customAiResult && (
          <div className="mt-3 p-4 bg-slate-950 border border-indigo-500/40 rounded-lg text-xs leading-relaxed text-slate-200 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plain English Breakdown:</span>
            </div>
            <div className="whitespace-pre-line text-slate-300">
              {customAiResult}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
