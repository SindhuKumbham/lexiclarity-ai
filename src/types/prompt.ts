export type StageId = 'all' | 'stage-1' | 'stage-2' | 'stage-3' | 'stage-4';

export interface StageDefinition {
  id: StageId;
  stageNumber: number;
  title: string;
  codename: string;
  platform: 'Google AI Studio' | 'Antigravity (Early Phase)' | 'Antigravity (Autonomous)' | 'Production Antigravity';
  summary: string;
  focus: string;
  deliverables: string[];
  antigravityCapabilities: string[];
  recommendedModel: string;
  systemPromptDirective: string;
}

export interface Archetype {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  defaultFeatures: string[];
  recommendedModels: string[];
  antigravityFocus: string;
}

export interface FeatureOption {
  id: string;
  category: 'core' | 'ai_engine' | 'staging' | 'persistence' | 'antigravity';
  name: string;
  description: string;
  stageIntroduction: 'stage-1' | 'stage-2' | 'stage-3' | 'stage-4';
  defaultEnabled: boolean;
}

export interface MasterPromptState {
  projectName: string;
  domain: string;
  archetypeId: string;
  systemMission: string;
  enabledFeatures: Record<string, boolean>;
  primaryModel: string;
  includeStagedHandoffNotes: boolean;
  strictAntiSlop: boolean;
  zeroMockGuarantee: boolean;
}

export interface LintResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C';
  strengths: string[];
  recommendations: string[];
  antiSlopChecks: {
    rule: string;
    passed: boolean;
    details: string;
  }[];
}
