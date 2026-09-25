import React, { useState } from 'react';
import { LegalDocument, ActionChecklist } from '../types/legal';
import { 
  CheckSquare, Calendar, FileEdit, Copy, Check, 
  Clock, AlertTriangle, ArrowRight, Download, Sparkles, 
  CheckCircle2, Bell
} from 'lucide-react';

interface Props {
  document: LegalDocument;
}

export const ActionDeliverables: React.FC<Props> = ({ document }) => {
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'dates' | 'redlines'>('checklist');
  const [tasks, setTasks] = useState(document.checklist.preSigningTasks);
  const [copiedRedlineId, setCopiedRedlineId] = useState<string | null>(null);
  const [copiedFullPacket, setCopiedFullPacket] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleCopyRedline = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRedlineId(id);
    setTimeout(() => setCopiedRedlineId(null), 2000);
  };

  const handleCopyFullRedlineEmail = () => {
    const emailBody = `Dear ${document.partyA},

Thank you for sending over the agreement for review. We are excited about moving forward. 

Upon reviewing the terms in detail, there are a few standard commercial adjustments we would like to request to ensure mutual alignment before execution:

${document.checklist.redlineCounterProposals.map((r, i) => `
${i + 1}. PROPOSED REVISION TO SECTION:
Current Language: "${r.originalClause}"
Proposed Modification: "${r.proposedRevision}"
Rationale: ${r.rationaleToProvide}
`).join('\n')}

Please let us know if these standard adjustments are acceptable, and we can execute the updated version promptly.

Best regards,
${document.partyB}`;

    navigator.clipboard.writeText(emailBody);
    setCopiedFullPacket(true);
    setTimeout(() => setCopiedFullPacket(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <CheckSquare className="w-4 h-4" />
              <span>Actionable Outputs & Execution Kit</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              Summaries, Timelines & Counter-Proposal Redlines
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Transform passive contract clauses into structured action plans: verification checklists, deadline calendars, and professional redline request letters.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleCopyFullRedlineEmail}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-md"
            >
              {copiedFullPacket ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedFullPacket ? 'Copied Full Email Packet' : 'Copy Counter-Proposal Email'}</span>
            </button>
          </div>
        </div>

        {/* Deliverable Subtabs */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'checklist'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Pre-Signing Checklist ({completedCount}/{tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'dates'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Critical Dates & Penalties ({document.checklist.criticalDates.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('redlines')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeSubTab === 'redlines'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5" />
            <span>Redline Counter-Proposals ({document.checklist.redlineCounterProposals.length})</span>
          </button>
        </div>
      </div>

      {/* Subtab 1: Pre-Signing Checklist */}
      {activeSubTab === 'checklist' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                Pre-Execution Verification Checklist
              </h4>
              <p className="text-xs text-slate-400">
                Essential protective actions to take before you sign or pay any deposits.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-300 font-semibold">{progressPercent}% Completed</span>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  task.done
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-70'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold ${
                        task.done ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {task.task}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                        task.priority === 'must_do'
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-900/60'
                          : 'bg-indigo-950/60 text-indigo-300 border border-indigo-900/60'
                      }`}
                    >
                      {task.priority === 'must_do' ? 'MUST DO' : 'RECOMMENDED'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    {task.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Critical Dates & Deadlines */}
      {activeSubTab === 'dates' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Critical Deadlines, Notice Windows & Trigger Traps</span>
            </h4>
            <p className="text-xs text-slate-400">
              Missing any of these contract calendar deadlines can trigger automatic renewals, liquidated damages, or forfeiture of security deposits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {document.checklist.criticalDates.map((date) => (
              <div
                key={date.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-amber-400 text-xs mb-2">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5" /> Deadline Trigger
                    </span>
                    <span className="text-[10px] bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-900/60 font-mono">
                      High Impact
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-100 mb-1">
                    {date.event}
                  </h5>

                  <div className="bg-slate-900 p-2 rounded border border-slate-800 font-mono text-xs text-indigo-300 mb-2">
                    {date.deadlineWindow}
                  </div>

                  <div className="bg-rose-950/20 border border-rose-900/40 p-2.5 rounded text-xs space-y-1">
                    <span className="text-rose-400 font-semibold block text-[11px]">Penalty If Missed:</span>
                    <p className="text-slate-300 text-xs">{date.penaltyIfMissed}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Set reminder for: <strong className="text-slate-200">{date.recommendedReminderDate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Redline Counter-Proposals */}
      {activeSubTab === 'redlines' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-indigo-400" />
              <span>Fairness Counter-Proposals & Suggested Redline Amendments</span>
            </h4>
            <p className="text-xs text-slate-400">
              Copy-paste these professionally formulated clause amendments directly into your negotiation correspondence.
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {document.checklist.redlineCounterProposals.map((redline) => (
              <div
                key={redline.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Proposed Clause Redline</span>
                  <button
                    onClick={() => handleCopyRedline(redline.id, redline.proposedRevision)}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
                  >
                    {copiedRedlineId === redline.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedRedlineId === redline.id ? 'Copied Revision' : 'Copy Revised Wording'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/90 border border-slate-800/80 p-3 rounded-lg space-y-1">
                    <span className="text-[11px] font-semibold text-rose-400 block">Current One-Sided Wording:</span>
                    <p className="font-mono text-slate-400 text-xs">"{redline.originalClause}"</p>
                  </div>

                  <div className="bg-indigo-950/20 border border-indigo-900/40 p-3 rounded-lg space-y-1">
                    <span className="text-[11px] font-semibold text-emerald-400 block">Proposed Balanced Replacement:</span>
                    <p className="font-mono text-emerald-200 text-xs">"{redline.proposedRevision}"</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <strong className="text-indigo-300">Persuasive Rationale to Counterparty:</strong> {redline.rationaleToProvide}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
