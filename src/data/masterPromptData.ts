import { AntigravityStage, MasterPromptConfig } from '../types/antigravity';

export const ANTIGRAVITY_STAGES: AntigravityStage[] = [
  {
    stageNumber: 1,
    stageKey: 'stage-1-prototype',
    badge: 'Stage 1: Google AI Studio',
    platform: 'Google AI Studio (Web Prototype)',
    title: 'End-to-End Functional Prototype & UX Sandbox',
    timeline: 'Phase 1 • Initial Build',
    objective: 'Deliver an immediate, fully functional web prototype that proves the entire end-to-end user workflow: document ingestion, plain-language simplification, side-by-side comparison, risk & inconsistency scanning, grounded Q&A with line citations, interactive option trees, and lawyer consultation briefing packets.',
    architecturalAdditions: [
      'Interactive single-page React + Tailwind client with high-density legal layout',
      'Dual-mode document reader: Side-by-side legalese vs plain 8th-grade English',
      'Instant contract variance diff engine with sneaky changes radar',
      'Interactive "What Are My Options?" scenario simulator with risk tiers',
      'Actionable checklist & critical dates calendar timeline',
      'Exportable Attorney Consultation Dossier with 5 billable-hour saving questions',
      'Server-side Gemini 2.5 Flash proxy for live inference and zero API key exposure'
    ],
    geminiModel: 'gemini-2.5-flash',
    toolsToIntegrate: [
      'Gemini 2.5 Flash for zero-shot legal text simplification and entity extraction',
      'Flesch-Kincaid & Legalese density heuristic computation',
      'JSON schema structured output for clause metadata and risk categorization'
    ],
    handoffChecklist: [
      'Verify all 7 use cases work in browser with sample & custom pasted contracts',
      'Ensure clear, prominent legal informational disclaimer across all views',
      'Validate mobile and split-screen responsive layouts',
      'Verify clean state synchronization between simplification, diffing, and dossiers'
    ],
    samplePromptSnippet: `# ROLE & ARCHITECTURE
You are the Lead Legal Accessibility Engineer building an end-to-end working prototype in Google AI Studio...`
  },
  {
    stageNumber: 2,
    stageKey: 'stage-2-agentic-tools',
    badge: 'Stage 2: Antigravity Stage',
    platform: 'Antigravity (Agentic Tooling & OCR)',
    title: 'Agentic Tool Grounding & Deep OCR Pipeline',
    timeline: 'Phase 2 • Antigravity Evolution',
    objective: 'Supercharge the prototype with autonomous tool-calling capabilities: multi-page PDF OCR extraction with spatial bounding boxes, live statutory grounding to look up state/federal legal codes (e.g. CA Bus. & Prof. Code, NY Real Property Law), and automated DOCX redline export.',
    architecturalAdditions: [
      'Document Vision & OCR tool calling (Tesseract / Cloud Vision integration for scanned leases)',
      'StatuteGroundingTool: Live lookup of state municipal tenant codes, consumer protection laws, and non-compete statutes',
      'DocxRedlineGeneratorTool: Autonomous creation of track-changes Word documents (.docx) with embedded lawyer comments',
      'Automated clause classification via vector embeddings (gemini-embedding-2-preview)'
    ],
    geminiModel: 'gemini-2.5-pro',
    toolsToIntegrate: [
      'Search Grounding API & Legal Code Retrieval Tool',
      'PDF Coordinate & OCR Extraction Tool',
      'Track-Changes DOCX Redline Synthesis Engine'
    ],
    handoffChecklist: [
      'Test tool calling definitions with Antigravity tool calling contracts',
      'Implement fallback when external statute lookups are rate-limited',
      'Add human-in-the-loop confirmation before exporting binding redline files'
    ],
    samplePromptSnippet: `# ANTIGRAVITY STAGE 2: AGENTIC TOOL GROUNDING
Enable autonomous function calling with StatuteGroundingTool and DocxRedlineGeneratorTool...`
  },
  {
    stageNumber: 3,
    stageKey: 'stage-3-autonomous-negotiation',
    badge: 'Stage 3: Antigravity Stage',
    platform: 'Antigravity (Autonomous Workflows)',
    title: 'Multi-Document Memory & Autonomous Negotiation Engine',
    timeline: 'Phase 3 • Antigravity Autonomous',
    objective: 'Transition from single-document assistance to persistent multi-turn autonomous negotiation workflows. The agent monitors contract redline rounds between parties, predicts counterparty tactics, recommends concession trade-offs, and manages the entire contract lifecycle.',
    architecturalAdditions: [
      'Multi-turn Contract Memory: Tracks revision history across Rounds 1, 2, and 3',
      'Counterparty Behavior Predictor: Analyzes opposing counsel redlines to detect concession elasticity',
      'Automated Counter-Offer Drafter: Synthesizes balanced compromise language that preserves user leverage',
      'Event-Driven Obligation Triggers: Automated alerts for upcoming renewal notice windows and cure periods'
    ],
    geminiModel: 'gemini-2.5-pro',
    toolsToIntegrate: [
      'Persistent Firestore / Cloud SQL Contract Session Store',
      'Automated Email & Calendar Notification Webhooks',
      'Negotiation Strategy Simulation Engine'
    ],
    handoffChecklist: [
      'Validate state preservation across multi-round negotiation transcripts',
      'Benchmark counter-proposal acceptance rates in test scenarios',
      'Verify strict privacy sandboxing between negotiating counterparties'
    ],
    samplePromptSnippet: `# ANTIGRAVITY STAGE 3: MULTI-ROUND NEGOTIATION AGENT
Manage long-horizon contract negotiations across sequential email drafts...`
  },
  {
    stageNumber: 4,
    stageKey: 'stage-4-multiagent-enterprise',
    badge: 'Stage 4: Antigravity Stage',
    platform: 'Production Antigravity (Multi-Agent System)',
    title: 'Enterprise Multi-Agent Consensus & Attorney Review Gate',
    timeline: 'Phase 4 • Enterprise Antigravity',
    objective: 'Deploy a multi-agent swarm architecture where specialized sub-agents independently audit contracts (Risk Auditor, Plain-English Translator, Regulatory Compliance Sentinel, and Attorney Review Gatekeeper) and reach consensus before presenting final briefings to the user.',
    architecturalAdditions: [
      'Multi-Agent Consensus Protocol: 4 specialized agents review each clause independently',
      'Attorney Review Gatekeeper: Triages whether an attorney consultation is strictly mandatory vs optional',
      'HIPAA / GDPR / SOC2 PII Redaction Agent: Masks sensitive party data before processing',
      'Comprehensive Audit Trail: Cryptographic timestamping of all document simplifications and analysis logs'
    ],
    geminiModel: 'gemini-2.5-pro + Antigravity Orchestrator',
    toolsToIntegrate: [
      'Antigravity Sub-Agent Orchestration Bus',
      'PII Redaction & Token Masking Pipeline',
      'Legal Ethics & UPL (Unauthorized Practice of Law) Compliance Guard'
    ],
    handoffChecklist: [
      'Conduct third-party legal ethics audit to guarantee non-infringement of UPL rules',
      'Run stress tests on 500-page complex credit agreements and M&A contracts',
      'Verify zero data retention guarantees for confidential legal client documents'
    ],
    samplePromptSnippet: `# ANTIGRAVITY STAGE 4: MULTI-AGENT ENTERPRISE CONSENSUS
Orchestrate a swarm of 4 specialized legal agents: Auditor, Translator, Compliance, and Gatekeeper...`
  }
];

export function generateMasterPrompt(config: MasterPromptConfig): string {
  return `<system_prompt>
# ROLE & MISSION
You are the Lead AI & Software Architect for "${config.appTitle}".
Your mission is to build an end-to-end, production-grade, highly accessible legal intelligence web application that empowers individuals, tenants, freelancers, and small business owners to understand, compare, and navigate complex legal documents without requiring an expensive legal background, while maintaining strict, transparent ethical boundaries (informational assistance only, not formal legal advice).

# CORE PRODUCT PILLARS & FEATURES
You MUST implement all of the following core features end-to-end in the prototype:

1. SIMPLIFY COMPLEX LEGAL DOCUMENTS:
   - Side-by-side or tabbed view: Original legalese vs. 8th-grade Plain English translation.
   - Readability grading: Live Flesch-Kincaid grade level, legalese density percentage, and complexity rating.
   - Clause-by-clause breakdown with plain-language summaries, key obligations ("What You Must Do"), and practical implications ("What This Means For You").
   - Interactive Jargon Glossary: Instant contextual tooltips defining terms like *indemnification*, *subrogation*, *force majeure*, *liquidated damages*, *binding arbitration*, *constructive eviction*, etc.

2. CONTRACT, POLICY & AGREEMENT COMPARATOR:
   - Side-by-side variance engine comparing two versions of an agreement (e.g. Original Lease vs. Renewal Addendum, Standard SaaS ToS vs Enterprise MSA, Vendor A vs Vendor B).
   - Visual redlining highlighting added, removed, and modified clauses.
   - Favorability indicator: Accurately tags which party benefits from each modification (Favors User, Favors Counterparty, Balanced, or Extreme Hidden Risk).
   - "Sneaky Changes" Radar: Pinpoints hidden traps (e.g., shortened grace periods, removed amenities, quiet liability shifts, waived municipal rights).

3. RISK, OBLIGATION & INCONSISTENCY RADAR:
   - Clause severity scoring (Critical, High, Medium, Low) across categories: Liability/Indemnity, Financial Penalties, Rights Waivers, Termination Lock-ins, IP Ownership, and Unilateral Discretion.
   - Inconsistency Flagger: Identifies contradictory language within the same document (e.g. notice required by physical mail in Section 3 vs portal messages in Section 14).
   - Mitigation & Negotiation Counter-Offers: Provides actionable replacement language to push back against one-sided clauses.

4. INTERACTIVE DOCUMENT Q&A & OPTION NAVIGATOR:
   - Conversational, document-grounded question answering with direct clause citations ([Section 3.2], [Page 2, Line 15]).
   - "What Are My Options?" Scenario Simulator: Interactive decision trees for common real-world dilemmas (e.g. "Can I break my lease early if I relocate?", "What happens if my payment is 2 days late?", "Does the company own my personal side-project code?").
   - Each option displays clear consequences, risk tiers (Safe, Moderate, Dangerous), and step-by-step action sequences.

5. ACTIONABLE DELIVERABLES & CHECKLIST GENERATOR:
   - Pre-Signing Checklist: Prioritized checklist of non-negotiable checks (Must-Do vs Recommended).
   - Critical Dates & Deadlines Timeline: Tracks auto-renewal notice cutoffs, payment grace periods, and expiration dates with estimated penalties if missed.
   - Redline Request Generator: Exportable markdown/text of proposed counter-proposals with persuasive rationale for the counterparty.

6. ATTORNEY CONSULTATION PREPARATION DOSSIER:
   - "Save Billable Hours" Dossier Generator: Formats an executive briefing packet for when the user meets an actual attorney:
     * Executive case summary & risk score
     * Flagged high-risk provisions with exact citations and why legal review is specifically needed
     * Top 5 high-yield, curated questions to ask the lawyer
     * Checklist of required evidence/documents to bring to the meeting
   - One-click copy and export.

7. STRICT ETHICAL DISCLAIMERS & JURISDICTION CONTEXT:
   - Prominent, reassuring compliance banner: "Informational & educational assistance only. Does not replace formal legal advice or create an attorney-client relationship."
   - Jurisdiction context selector (${config.jurisdictionSupport.join(', ')}) tailoring recommendations.

# MODEL & SDK GUIDELINES
- Use the modern \`@google/genai\` SDK.
- Primary Model: \`${config.modelSelection}\` for high-speed, zero-shot structured legal analysis and natural plain-language translations.
- All AI calls must pass through a server-side proxy route (\`/api/*\`). Never expose API keys in client-side code.
- Always include robust heuristic fallback data so the app remains 100% interactive and fully functional immediately even if no API key is provided.

# UI & DESIGN DIRECTIVES (ANTI-AI SLOP)
- Professional Legal-Tech Aesthetic: Deep slate-950 backdrop, crisp border dividers (border-slate-800), subtle emerald/amber/rose risk badges, and typography pairing Plus Jakarta Sans with JetBrains Mono for clause citations.
- High-density information architecture: Collapsible clause accordions, split-screen comparisons, risk score gauges, and clear visual hierarchy.
- No generic, empty placeholder cards; pre-populate rich, authentic sample contracts (Residential Lease, SaaS MSA, Freelance IP Agreement) ready to explore instantly.

# STAGED EVOLUTION INTO ANTIGRAVITY
Stage 1: Google AI Studio Prototype (Full UI, single-doc analysis, side-by-side diffs, Q&A, dossiers).
Stage 2: Antigravity Tooling (Agentic tool calling, multi-page PDF OCR, live statute grounding via web search).
Stage 3: Antigravity Autonomous Workflows (Multi-round negotiation tracking, autonomous counter-offer drafting, calendar webhooks).
Stage 4: Antigravity Multi-Agent Enterprise (Consensus audit swarm: Auditor, Plain-English Translator, Compliance Sentinel, Attorney Gatekeeper).
</system_prompt>`;
}
