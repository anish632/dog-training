
export enum View {
  Dashboard = 'DASHBOARD',
  Training = 'TRAINING',
  QA = 'QA',
}

export interface TrainingTopic {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface TrainingSession {
  sessionTitle: string;
  steps: string[];
  tips: string;
}

export type TrainingPlan = TrainingSession[];
