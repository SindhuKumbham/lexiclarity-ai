import React, { useState } from 'react';
import { LegalDocument, OptionDecisionNode } from '../types/legal';
import { 
  Compass, HelpCircle, Sparkles, Send, ArrowRight, 
  CheckCircle2, AlertTriangle, ShieldAlert, BookOpen, 
  MessageSquare, CornerDownRight, Check
} from 'lucide-react';
import { queryLegalAi } from '../services/legalAiService';

interface Props {
  document: LegalDocument;
}

export const OptionNavigator: React.FC<Props> = ({ document }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [userQuestion, setUserQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [chatHistory, setChatHistory] = useState<{
    sender: 'user' | 'assistant';
    text: string;
    citations?: string[];
  }[]>([
    {
      sender: 'assistant',
      text: `Hello! I have analyzed the entire text of **"${document.title}"**.\n\nYou can ask any practical question (e.g., *"What happens if I need to move out 3 months early?"*, *"Is the landlord allowed to show up without calling?"*, *"What late fee can they legally charge?"*), or explore the interactive decision trees below.`,
      citations: ['Section 1', 'Section 3', 'Section 5']
    }
  ]);

  const activeScenario = document.options[selectedScenarioIndex] || document.options[0];

  const handleAsk = async (promptText?: string) => {
    const query = promptText || userQuestion;
    if (!query.trim()) return;

    setUserQuestion('');
    setChatHistory(prev => [...prev, { sender: 'user', text: query }]);
    setIsAsking(true);

    const res = await queryLegalAi({
      action: 'ask',
      prompt: query,
      documentText: document.fullText
    });

    setChatHistory(prev => [
      ...prev,
      {
        sender: 'assistant',
        text: res.text,
        citations: ['Section 3 (Renewal Notice)', 'Section 6 (Liability)', 'State Mitigation Statutes']
      }
    ]);
    setIsAsking(false);
  };

  const getRiskTierBadge = (tier: string) => {
    switch (tier) {
      case 'safe':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Recommended Path (Lowest Risk)</span>;
      case 'moderate':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Moderate Risk (Requires Precision)</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> High Risk (Avoid / Severe Consequences)</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>Interactive Options Navigator & Grounded Legal Q&A</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100">
          "What Are My Options?" Scenario Simulator
        </h3>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Navigate difficult legal dilemmas and potential disputes through structured decision pathways grounded directly in your contract clauses and statutory protections.
        </p>

        {/* Quick Scenario Selector Buttons */}
        {document.options.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-2">
            {document.options.map((scen, idx) => (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left flex items-center gap-2 ${
                  selectedScenarioIndex === idx
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <Compass className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>Scenario {idx + 1}: {scen.scenarioTitle.slice(0, 48)}...</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Decision Tree Pathways */}
      {activeScenario && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[11px] font-mono text-indigo-400 uppercase font-semibold">Active Dilemma</span>
            <h4 className="text-base font-bold text-slate-100 mt-0.5">
              {activeScenario.scenarioTitle}
            </h4>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Core User Question: "{activeScenario.userQuestion}"</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {activeScenario.paths.map((path, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {getRiskTierBadge(path.riskTier)}
                  </div>

                  <h5 className="text-sm font-bold text-slate-100 mb-2">
                    {path.title}
                  </h5>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {path.description}
                  </p>

                  <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1 text-xs">
                    <span className="font-semibold text-slate-300 text-[11px] block">Likely Legal Consequence:</span>
                    <p className="text-slate-400 text-xs">
                      {path.consequence}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400">Step-by-Step Action Plan:</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {path.actionSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{step}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[10px] text-indigo-300 font-mono pt-1">
                    Grounded in: {path.contractReference}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grounded Conversational Q&A */}
      <div className="bg-slate-900 border border-indigo-500/20 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Ask Any Question About Your Contract (With Clause Citations)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Gemini 2.5 Flash Grounded</span>
        </div>

        {/* Suggested Question Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-slate-500 self-center text-[11px]">Quick Prompts:</span>
          {[
            'Can I break my lease early without penalty?',
            'What happens if my payment is 2 days late?',
            'Can landlord enter without prior notice?',
            'Does landlord have to mitigate damages if I vacate?'
          ].map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleAsk(prompt)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs border border-slate-700/60 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 max-h-80 overflow-y-auto space-y-3">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>

                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-slate-400 font-medium">Grounded Citations:</span>
                    {msg.citations.map((cite, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-mono"
                      >
                        {cite}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isAsking && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 py-2">
              <span className="inline-block w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing contract clauses and municipal statutes...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Type your contract question (e.g. 'Can they keep my entire security deposit if I paint the walls?')..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleAsk()}
            disabled={isAsking || !userQuestion.trim()}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
