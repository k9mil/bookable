import { ProjectInfo } from "@/types/consultation";

export const generatePRD = (info: ProjectInfo) => {
  return `
Product Requirements Document (PRD)

Problem Statement
${info.problemStatement}

Target Audience
${info.targetAudience}

Key Features
${info.keyFeatures}

Success Metrics
${info.successMetrics}

Timeline
${info.timeline}
  `.trim();
};