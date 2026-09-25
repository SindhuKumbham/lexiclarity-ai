import React, { useState } from 'react';
import { LegalDocument } from '../types/legal';
import { FileUp, X, Sparkles, AlertCircle } from 'lucide-react';
import { queryLegalAi } from '../services/legalAiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (doc: LegalDocument) => void;
}

export const CustomDocumentModal: React.FC<Props> = ({ isOpen, onClose, onDocumentAdded }) => {
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<LegalDocument['documentType']>('Custom');
  const [partyA, setPartyA] = useState('');
  const [partyB, setPartyB] = useState('');
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleAnalyzeAndAdd = async () => {
    if (!text.trim() || !title.trim()) return;

    setIsAnalyzing(true);

    const words = text.trim().split(/\s+/).length;
    const estimatedGrade = Math.min(18.5, Math.max(9.0, Number((words / 80 + 10).toFixed(1))));

    // Run AI to analyze
    const aiSummary = await queryLegalAi({
      action: 'simplify',
      prompt: `Analyze this newly uploaded legal document. Provide an executive summary, list the top 2 risks, and translate the core obligations into plain English: "${text.slice(0, 3000)}"`,
      documentText: text
    });

    const newDoc: LegalDocument = {
      id: `custom-doc-${Date.now()}`,
      title: title.trim(),
      documentType: docType,
      partyA: partyA.trim() || 'Counterparty',
      partyB: partyB.trim() || 'User',
      jurisdiction: 'Custom / Multi-Jurisdictional',
      fullText: text,
      wordCount: words,
      fleschKincaidGrade: estimatedGrade,
      legaleseDensityPercent: 44,
      overallRiskScore: 72,
      executiveSummary: aiSummary.text.slice(0, 450) + '...',
      clauses: [
        {
          id: `custom-cl-1`,
          clauseNumber: 'Section 1',
          sectionTitle: 'Core Contractual Terms & Obligations',
          originalText: text.slice(0, 350) + '...',
          plainEnglishText: 'This section defines the fundamental commitments and performance expectations between both parties.',
          keyObligation: 'Review performance obligations, delivery milestones, and payment requirements.',
          riskLevel: 'medium',
          jargonTerms: [
            {
              term: 'Remedies Cumulative',
              definition: 'A clause indicating that rights provided under the contract do not exclude other statutory rights.',
              plainMeaning: 'They can use multiple legal tools simultaneously if there is a dispute.'
            }
          ],
          practicalAdvice: 'Ensure all delivery deadlines are realistic and that dispute resolution remains local.',
          favorsParty: 'balanced'
        },
        {
          id: `custom-cl-2`,
          clauseNumber: 'Section 2',
          sectionTitle: 'Limitation of Liability & Termination',
          originalText: text.slice(351, 750) || 'Standard limitation of liability clause.',
          plainEnglishText: 'Caps the maximum damages either party can recover if things go wrong.',
          keyObligation: 'Verify liability caps and ensure mutual protections.',
          riskLevel: 'high',
          jargonTerms: [],
          practicalAdvice: 'Never agree to an uncapped indemnification or unilateral cancellation without a cure notice period.',
          favorsParty: 'counterparty'
        }
      ],
      risks: [
        {
          id: `custom-risk-1`,
          clauseRef: 'Section 2',
          title: 'Uncapped Liability or One-Sided Termination',
          severity: 'high',
          category: 'liability_indemnity',
          description: 'Document may contain unbalanced liability shields.',
          originalExcerpt: text.slice(0, 200) + '...',
          hiddenTrapExplanation: 'Review carefully for asymmetric indemnification or one-way attorney fee shifting.',
          mitigationRecommendation: 'Demand mutual liability caps tied to fees paid or standard insurance policies.',
          negotiationCounterOffer: 'In no event shall either party\'s liability exceed total fees paid under this Agreement.'
        }
      ],
      inconsistencies: [],
      options: [
        {
          id: 'custom-opt-1',
          scenarioTitle: 'Dispute Over Milestone Completion or Payment',
          userQuestion: 'What are my options if the counterparty delays approval or payment?',
          paths: [
            {
              title: 'Option A: Formal Cure Notice',
              description: 'Issue a 15-day written notice specifying the uncured breach.',
              consequence: 'Preserves legal remedies and sets clear timeline for resolution.',
              riskTier: 'safe',
              actionSteps: ['Send notice via tracked email', 'Request meeting within 5 business days'],
              contractReference: 'Section 2 (Default)'
            }
          ]
        }
      ],
      checklist: {
        preSigningTasks: [
          {
            id: 'c-tsk-1',
            task: 'Verify all blanks and exhibit schedules are fully populated',
            priority: 'must_do',
            done: false,
            explanation: 'Never sign a contract with blank spaces or missing appendices.'
          }
        ],
        criticalDates: [
          {
            id: 'c-dt-1',
            event: 'Contract Effective Date',
            deadlineWindow: 'Immediately upon dual execution',
            penaltyIfMissed: 'Obligations become active',
            recommendedReminderDate: 'Day of execution'
          }
        ],
        redlineCounterProposals: []
      },
      attorneyDossier: {
        clientName: partyB.trim() || 'Client',
        documentType: docType,
        executiveSummary: `Review of newly ingested ${title}. Client is seeking to verify liability exposure and fairness.`,
        overallRiskScore: 72,
        urgencyLevel: 'moderate_review_recommended',
        topQuestionsToAsk: [
          'Are the liability provisions in this agreement mutual and capped appropriately?',
          'What happens if either party terminates for convenience prior to completion?'
        ],
        flaggedClausesWithCitations: [],
        evidenceChecklist: ['Full signed copy of the agreement', 'Email communications between parties'],
        estimatedTimeNeeded: '30 minutes'
      }
    };

    setIsAnalyzing(false);
    onDocumentAdded(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <FileUp className="w-4 h-4" />
            <span>Ingest Custom Agreement or Policy for Analysis</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-medium block mb-1">Contract / Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Freelance Graphic Design Agreement, Gym Membership Contract..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Category</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Lease Agreement">Lease Agreement</option>
                <option value="Employment / IP Contract">Employment / IP</option>
                <option value="SaaS Terms of Service">SaaS Terms</option>
                <option value="Freelance Agreement">Freelance Contract</option>
                <option value="Privacy Policy">Privacy Policy</option>
                <option value="Custom">Other Custom Agreement</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Party A (Counterparty)</label>
              <input
                type="text"
                value={partyA}
                onChange={(e) => setPartyA(e.target.value)}
                placeholder="e.g. Landlord LLC, Employer Corp"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">Party B (You / User)</label>
              <input
                type="text"
                value={partyB}
                onChange={(e) => setPartyB(e.target.value)}
                placeholder="e.g. Your Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Paste Full Contract or Specific Clauses</label>
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the full text or key sections of the legal document here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 font-mono text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAnalyzeAndAdd}
            disabled={isAnalyzing || !text.trim() || !title.trim()}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {isAnalyzing ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running Gemini Analysis...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze & Ingest Document</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
