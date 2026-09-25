export interface AntigravityStage {
  stageNumber: number;
  stageKey: string;
  badge: string;
  platform: string;
  title: string;
  timeline: string;
  objective: string;
  architecturalAdditions: string[];
  geminiModel: string;
  toolsToIntegrate: string[];
  handoffChecklist: string[];
  samplePromptSnippet: string;
}

export interface MasterPromptConfig {
  appTitle: string;
  coreMission: string;
  targetAudience: string;
  jurisdictionSupport: string[];
  strictLegalDisclaimer: boolean;
  activeFeatures: {
    simplification: boolean;
    comparison: boolean;
    riskDetection: boolean;
    inconsistencyRadar: boolean;
    groundedQA: boolean;
    optionSimulator: boolean;
    actionChecklists: boolean;
    attorneyDossier: boolean;
  };
  modelSelection: string;
  antigravityStagedPlanIncluded: boolean;
}
