export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface JargonDefinition {
  term: string;
  definition: string;
  plainMeaning: string;
}

export interface SimplifiedClause {
  id: string;
  clauseNumber: string;
  sectionTitle: string;
  originalText: string;
  plainEnglishText: string;
  keyObligation: string;
  riskLevel: RiskSeverity;
  jargonTerms: JargonDefinition[];
  practicalAdvice: string;
  favorsParty: 'user' | 'counterparty' | 'balanced' | 'heavily_one_sided';
}

export interface RiskItem {
  id: string;
  clauseRef: string;
  title: string;
  severity: RiskSeverity;
  category: 'financial_penalty' | 'liability_indemnity' | 'rights_waiver' | 'termination_lockin' | 'ip_ownership' | 'unilateral_discretion';
  description: string;
  originalExcerpt: string;
  hiddenTrapExplanation: string;
  mitigationRecommendation: string;
  negotiationCounterOffer?: string;
}

export interface InconsistencyItem {
  id: string;
  title: string;
  sectionA: string;
  quoteA: string;
  sectionB: string;
  quoteB: string;
  conflictAnalysis: string;
  suggestedClarification: string;
}

export interface ClauseDiff {
  clauseId: string;
  clauseTitle: string;
  docAText: string;
  docBText: string;
  changeType: 'added' | 'removed' | 'modified' | 'identical';
  impactAnalysis: string;
  favorability: 'favors_doc_a' | 'favors_doc_b' | 'neutral' | 'critical_risk';
  sneakyAlert?: string;
}

export interface OptionDecisionNode {
  id: string;
  scenarioTitle: string;
  userQuestion: string;
  paths: {
    title: string;
    description: string;
    consequence: string;
    riskTier: 'safe' | 'moderate' | 'high_risk';
    actionSteps: string[];
    contractReference: string;
  }[];
}

export interface ActionChecklist {
  preSigningTasks: {
    id: string;
    task: string;
    priority: 'must_do' | 'recommended' | 'optional';
    done: boolean;
    explanation: string;
  }[];
  criticalDates: {
    id: string;
    event: string;
    deadlineWindow: string;
    penaltyIfMissed: string;
    recommendedReminderDate: string;
  }[];
  redlineCounterProposals: {
    id: string;
    originalClause: string;
    proposedRevision: string;
    rationaleToProvide: string;
  }[];
}

export interface AttorneyBriefingDossier {
  clientName: string;
  documentType: string;
  executiveSummary: string;
  overallRiskScore: number; // 0 - 100
  urgencyLevel: 'immediate_counsel_advised' | 'moderate_review_recommended' | 'standard_review';
  topQuestionsToAsk: string[];
  flaggedClausesWithCitations: {
    section: string;
    issue: string;
    whyLawyerInputNeeded: string;
  }[];
  evidenceChecklist: string[];
  estimatedTimeNeeded: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  documentType: 'Lease Agreement' | 'Employment / IP Contract' | 'SaaS Terms of Service' | 'Freelance Agreement' | 'Privacy Policy' | 'Custom';
  partyA: string;
  partyB: string;
  jurisdiction: string;
  fullText: string;
  wordCount: number;
  fleschKincaidGrade: number; // e.g. 16.4 (Law graduate level)
  legaleseDensityPercent: number; // e.g. 42%
  overallRiskScore: number; // 0 - 100 (higher = riskier)
  executiveSummary: string;
  clauses: SimplifiedClause[];
  risks: RiskItem[];
  inconsistencies: InconsistencyItem[];
  options: OptionDecisionNode[];
  checklist: ActionChecklist;
  attorneyDossier: AttorneyBriefingDossier;
}
