import React, { useState } from 'react';
import { SAMPLE_DOCUMENTS } from './data/sampleDocuments';
import { LegalDocument } from './types/legal';
import { LegalDisclaimerBanner } from './components/LegalDisclaimerBanner';
import { DocumentSimplifier } from './components/DocumentSimplifier';
import { ContractComparator } from './components/ContractComparator';
import { RiskRadar } from './components/RiskRadar';
import { OptionNavigator } from './components/OptionNavigator';
import { ActionDeliverables } from './components/ActionDeliverables';
import { AttorneyDossierView } from './components/AttorneyDossierView';
import { MasterPromptStudio } from './components/MasterPromptStudio';
import { CustomDocumentModal } from './components/CustomDocumentModal';
import { 
  Scale, FileText, GitCompare, ShieldAlert, 
  Compass, CheckSquare, Briefcase, Terminal, 
  Plus, ChevronDown, Sparkles
} from 'lucide-react';

export default function App() {
  const [documents, setDocuments] = useState<LegalDocument[]>(SAMPLE_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-lease-standard');
  const [activeTab, setActiveTab] = useState<
    'simplify' | 'compare' | 'risks' | 'navigator' | 'deliverables' | 'attorney-dossier' | 'master-prompt'
  >('simplify');
  const [jurisdiction, setJurisdiction] = useState<string>('State of New York / Standard US Urban');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const currentDocument = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleDocumentAdded = (newDoc: LegalDocument) => {
    setDocuments(prev => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
    setActiveTab('simplify');
  };

  const navItems = [
    {
      id: 'simplify',
      label: 'Document Simplifier',
      subtitle: 'Plain English & Jargon Decoder',
      icon: FileText,
    },
    {
      id: 'compare',
      label: 'Contract Comparator',
      subtitle: 'Side-by-Side Diff & Sneaky Traps',
      icon: GitCompare,
      badge: 'Variance Engine'
    },
    {
      id: 'risks',
      label: 'Risk & Inconsistency Radar',
      subtitle: 'Exposure & Counter-Offers',
      icon: ShieldAlert,
      badge: `${currentDocument.risks.length} Traps`
    },
    {
      id: 'navigator',
      label: 'Options & Q&A Navigator',
      subtitle: 'Scenario Simulator & Grounded Chat',
      icon: Compass,
    },
    {
      id: 'deliverables',
      label: 'Action Deliverables',
      subtitle: 'Checklists, Calendars & Redlines',
      icon: CheckSquare,
    },
    {
      id: 'attorney-dossier',
      label: 'Attorney Prep Dossier',
      subtitle: 'Save Billable Hours Kit',
      icon: Briefcase,
    },
    {
      id: 'master-prompt',
      label: 'Master Prompt & Antigravity',
      subtitle: 'AI Studio Prompt & Staged Roadmap',
      icon: Terminal,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Application Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Logo & Product Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">
                  LexiClarity <span className="text-indigo-400 font-medium">AI</span>
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
                  Legal Accessibility Suite
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Understand, compare & navigate legal contracts with AI assistance
              </p>
            </div>
          </div>

          {/* Document Switcher & Master Prompt Action */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
                className="bg-transparent text-slate-200 font-medium text-xs focus:outline-none cursor-pointer max-w-[190px] truncate"
              >
                {documents.map(d => (
                  <option key={d.id} value={d.id} className="bg-slate-900 text-slate-200">
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsCustomModalOpen(true)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1 transition-colors"
              title="Upload or Paste Custom Agreement"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Paste Custom</span>
            </button>

            <button
              onClick={() => setActiveTab('master-prompt')}
              className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Master Prompt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Legal Ethical Boundary & Jurisdiction Banner */}
      <LegalDisclaimerBanner
        jurisdiction={jurisdiction}
        onJurisdictionChange={setJurisdiction}
      />

      {/* Main Tab Navigation Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : tab.highlight
                    ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/60 hover:bg-indigo-900/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && !isActive && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && !isActive && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Staging
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'simplify' && (
          <DocumentSimplifier document={currentDocument} />
        )}

        {activeTab === 'compare' && (
          <ContractComparator />
        )}

        {activeTab === 'risks' && (
          <RiskRadar document={currentDocument} />
        )}

        {activeTab === 'navigator' && (
          <OptionNavigator document={currentDocument} />
        )}

        {activeTab === 'deliverables' && (
          <ActionDeliverables document={currentDocument} />
        )}

        {activeTab === 'attorney-dossier' && (
          <AttorneyDossierView document={currentDocument} />
        )}

        {activeTab === 'master-prompt' && (
          <MasterPromptStudio />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">LexiClarity AI</span>
            <span>•</span>
            <span>Empowering public legal literacy and document accessibility through GenAI</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span>Powered by Google Gemini 2.5 Flash</span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('master-prompt')}
              className="text-indigo-400 hover:underline"
            >
              View Antigravity Master Architecture
            </button>
          </div>
        </div>
      </footer>

      {/* Custom Ingestion Modal */}
      <CustomDocumentModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />
    </div>
  );
}
