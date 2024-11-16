export type Question = {
  id: number;
  text: string;
  key: keyof ProjectInfo;
};

export type ProjectInfo = {
  problemStatement: string;
  targetAudience: string;
  keyFeatures: string;
  successMetrics: string;
  timeline: string;
};