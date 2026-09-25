import React, { useState } from 'react';
import { ANTIGRAVITY_STAGES, generateMasterPrompt } from '../data/masterPromptData';
import { MasterPromptConfig } from '../types/antigravity';
import { 
  Terminal, Copy, Check, Download, Layers, 
  Sparkles, ArrowRight, ShieldCheck, Cpu, 
  Workflow, BookOpen, CheckCircle2, ChevronRight, Sliders
} from 'lucide-react';

export const MasterPromptStudio: React.FC = () => {
  const [selectedStageTab, setSelectedStageTab] = useState<number>(1);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedStageSnippet, setCopiedStageSnippet] = useState<number | null>(null);

  const [promptConfig, setPromptConfig] = useState<MasterPromptConfig>({
    appTitle: 'LexiClarity AI: Legal Accessibility & Intelligence Suite',
    coreMission: 'Empowering tenants, consumers, and small businesses to comprehend, compare, and navigate complex legal documents with grounded plain English and actionable dossiers.',
    targetAudience: 'Tenants, Freelancers, Small Business Owners, Everyday Consumers',
    jurisdictionSupport: ['US Federal', 'New York (RPL)', 'California (Civ Code)', 'Delaware Corporate', 'UK Common Law'],
    strictLegalDisclaimer: true,
    activeFeatures: {
      simplification: true,
      comparison: true,
      riskDetection: true,
      inconsistencyRadar: true,
      groundedQA: true,
      optionSimulator: true,
      actionChecklists: true,
      attorneyDossier: true,
    },
    modelSelection: 'gemini-2.5-flash',
    antigravityStagedPlanIncluded: true
  });

  const masterPromptText = generateMasterPrompt(promptConfig);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleDownloadPrompt = () => {
    const blob = new Blob([masterPromptText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Google_AI_Studio_Master_Prompt_Legal_Accessibility.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const activeStage = ANTIGRAVITY_STAGES.find(s => s.stageNumber === selectedStageTab) || ANTIGRAVITY_STAGES[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Prompt Architecture & Antigravity Staging Suite</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Master Prompt & Staged Evolution Roadmap
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Below is the comprehensive, production-ready Master Prompt to build this end-to-end working prototype in Google AI Studio, followed by the exact stage-by-stage architecture to evolve it into Antigravity.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={handleCopyPrompt}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              {copiedPrompt ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPrompt ? 'Copied Master Prompt!' : 'Copy Master Prompt'}</span>
            </button>

            <button
              onClick={handleDownloadPrompt}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Download Master Prompt Markdown"
            >
              <Download className="w-4 h-4" />
              <span>.md</span>
            </button>
          </div>
        </div>
      </div>

      {/* Antigravity Staging Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Staged Evolution Pipeline (AI Studio Prototype → Antigravity)</span>
            </h4>
            <span className="text-xs font-mono text-indigo-400 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-800/60">
              4 Staged Milestones
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build your baseline prototype in Google AI Studio first, then seamlessly unlock autonomous agents, tool grounding, and enterprise swarms in Antigravity.
          </p>
        </div>

        {/* Stage Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {ANTIGRAVITY_STAGES.map((stage) => {
            const isSelected = selectedStageTab === stage.stageNumber;
            return (
              <button
                key={stage.stageNumber}
                onClick={() => setSelectedStageTab(stage.stageNumber)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                      {stage.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {stage.timeline.split('•')[0]}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 line-clamp-1 mt-1">
                    {stage.title}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 line-clamp-2 mt-2">
                  {stage.objective}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep Dive */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-indigo-400 font-semibold">{activeStage.platform}</span>
              <h5 className="text-base font-bold text-slate-100">
                {activeStage.title}
              </h5>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Model:</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-300 font-semibold">
                {activeStage.geminiModel}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeStage.objective}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Architectural Additions */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 space-y-2">
              <div className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>Architectural & Functional Additions:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeStage.architecturalAdditions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Antigravity Tools to Integrate */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 space-y-2">
              <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" />
                <span>Antigravity Tool Calling & Subsystems:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeStage.toolsToIntegrate.map((tool, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ChevronRight className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span className="font-mono text-[11px] text-slate-300">{tool}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Stage Handoff Criteria:
                </div>
                <ul className="space-y-1 text-[11px] text-slate-400">
                  {activeStage.handoffChecklist.map((chk, cIdx) => (
                    <li key={cIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Raw Master Prompt Code Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
              Google_AI_Studio_Master_Prompt.md
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPrompt}
              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
            </button>
          </div>
        </div>

        <div className="p-5 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto max-h-[500px] leading-relaxed selection:bg-indigo-500/40">
          <pre className="whitespace-pre-wrap">{masterPromptText}</pre>
        </div>
      </div>
    </div>
  );
};
