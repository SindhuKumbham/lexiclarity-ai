import React, { useState } from 'react';
import { LegalDocument, AttorneyBriefingDossier } from '../types/legal';
import { 
  Briefcase, Scale, HelpCircle, FileCheck, Copy, 
  Check, Download, Printer, ShieldAlert, ArrowRight, 
  Clock, Sparkles
} from 'lucide-react';
import { queryLegalAi } from '../services/legalAiService';

interface Props {
  document: LegalDocument;
}

export const AttorneyDossierView: React.FC<Props> = ({ document }) => {
  const dossier = document.attorneyDossier;
  const [copied, setCopied] = useState(false);
  const [aiCustomQuestion, setAiCustomQuestion] = useState('');
  const [aiCustomAdvice, setAiCustomAdvice] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'immediate_counsel_advised':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5" /> High Urgency: Review Before Signing</span>;
      case 'moderate_review_recommended':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /> Consultation Recommended</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Routine Review</span>;
    }
  };

  const handleCopyDossier = () => {
    const text = `=====================================================
LEGAL COUNSEL CONSULTATION BRIEFING PACKET
Generated via LexiClarity AI (Save Billable Hours Kit)
=====================================================

CLIENT: ${dossier.clientName}
MATTER: Review of ${dossier.documentType}
ESTIMATED TIME NEEDED: ${dossier.estimatedTimeNeeded}
OVERALL RISK SCORE: ${dossier.overallRiskScore}/100

1. EXECUTIVE BRIEFING:
${dossier.executiveSummary}

2. TOP 5 TARGETED QUESTIONS TO ASK LEGAL COUNSEL:
${dossier.topQuestionsToAsk.map((q, i) => `${i + 1}. ${q}`).join('\n')}

3. FLAGGED PROVISIONS REQUIRING ATTORNEY OPINION:
${dossier.flaggedClausesWithCitations.map(f => `- [${f.section}]: ${f.issue} (Legal inquiry: ${f.whyLawyerInputNeeded})`).join('\n')}

4. EVIDENCE & DOCUMENTATION PREPARED:
${dossier.evidenceChecklist.map(e => `[x] ${e}`).join('\n')}

NOTE: Prepared for informational structuring to maximize consultation efficiency. Does not replace attorney legal advice.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCustomQuestion = async () => {
    if (!aiCustomQuestion.trim()) return;
    setIsGenerating(true);

    const res = await queryLegalAi({
      action: 'generate_dossier',
      prompt: `Frame 3 highly specific, legally grounded questions that a client should ask their attorney regarding this concern: "${aiCustomQuestion}" in the context of: ${document.title}`,
      documentText: document.fullText
    });

    setAiCustomAdvice(res.text);
    setIsGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Attorney Consultation Preparation Packet</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              Save Billable Hours: Pre-Consultation Dossier
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Attorneys bill $350 - $700+ per hour. Walking in with this organized briefing dossier ensures you skip 30 minutes of basic fact-finding and dive straight into high-value strategic legal advice.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={handleCopyDossier}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Dossier' : 'Copy Consultation Dossier'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Urgency & Stats Strip */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            {getUrgencyBadge(dossier.urgencyLevel)}
            <span className="text-slate-400 flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              Estimated Review Time: <strong className="text-slate-200">{dossier.estimatedTimeNeeded}</strong>
            </span>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            Targeted for: <span className="text-slate-200 font-semibold">{dossier.documentType}</span>
          </div>
        </div>
      </div>

      {/* Printable Consultation Dossier Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6 print:bg-white print:text-black">
        {/* Dossier Header */}
        <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">Confidential Client Matter</span>
            <h4 className="text-base font-bold text-slate-100">
              Attorney Consultation Brief: {document.title}
            </h4>
            <div className="text-xs text-slate-400 mt-0.5">
              Client: <strong className="text-slate-200">{dossier.clientName}</strong> | Jurisdiction: <strong className="text-slate-200">{document.jurisdiction}</strong>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono">Risk Rating</span>
            <div className="text-2xl font-bold text-rose-400 font-mono">
              {dossier.overallRiskScore}/100
            </div>
          </div>
        </div>

        {/* Executive Case Summary */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>1. Executive Summary for Counsel</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            {dossier.executiveSummary}
          </p>
        </div>

        {/* 5 Targeted Questions to Ask Lawyer */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Top Strategic Questions to Ask During Your Consultation</span>
          </div>
          <p className="text-xs text-slate-400">
            Ask these specific questions verbatim to focus your attorney on the highest-liability traps:
          </p>

          <div className="space-y-2">
            {dossier.topQuestionsToAsk.map((q, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-start gap-3 text-xs"
              >
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold shrink-0">
                  Q{idx + 1}
                </span>
                <span className="text-slate-200 font-medium leading-relaxed">
                  "{q}"
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Flagged Provisions Requiring Counsel */}
        {dossier.flaggedClausesWithCitations.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>3. Flagged Provisions for Direct Legal Scrutiny</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {dossier.flaggedClausesWithCitations.map((flag, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2 text-xs"
                >
                  <span className="font-mono font-bold text-slate-200 block border-b border-slate-800 pb-1">
                    {flag.section}
                  </span>
                  <div className="text-slate-300 text-[11px]">
                    <strong className="text-rose-400">Issue:</strong> {flag.issue}
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <strong className="text-indigo-300">Why Lawyer Needed:</strong> {flag.whyLawyerInputNeeded}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Evidence & Checklist to Bring */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5" />
            <span>4. Checklist of Documents to Bring to the Meeting</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {dossier.evidenceChecklist.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-2.5 rounded border border-slate-800 flex items-center gap-2 text-slate-300"
              >
                <div className="w-3.5 h-3.5 rounded border border-slate-600 bg-slate-900 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Custom Question Generator */}
      <div className="bg-slate-900 border border-indigo-500/20 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Tailor More Attorney Questions (Gemini 2.5 Flash)</span>
        </div>
        <p className="text-xs text-slate-300">
          Have a specific concern (e.g. *"I have a pet emotional support animal"*, *"I run a consulting side-business from home"*? Enter it below to formulate precise lawyer questions.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={aiCustomQuestion}
            onChange={(e) => setAiCustomQuestion(e.target.value)}
            placeholder="Enter your personal situation or concern..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleGenerateCustomQuestion}
            disabled={isGenerating || !aiCustomQuestion.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            {isGenerating ? 'Generating...' : 'Formulate Questions'}
          </button>
        </div>

        {aiCustomAdvice && (
          <div className="mt-3 p-3.5 bg-slate-950 border border-indigo-500/30 rounded-lg text-xs text-slate-200 whitespace-pre-line leading-relaxed">
            {aiCustomAdvice}
          </div>
        )}
      </div>
    </div>
  );
};
