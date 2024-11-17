import Section from "@/components/Section";
import Requirement from "@/components/Requirement";

export interface PRD {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  version: string;
  keyFeatures: string[];
  timeline: {
    development: string;
    mvp: string;
    budget: string;
  };
  imageUrl: string;
}

interface PRDCardProps {
  prd: PRD;
}

const PRDCard = ({ prd }: PRDCardProps) => {
  return (
    <div className="flex-1 w-full">
      <div className="glass-card p-8 animate-fade-up hover:border-[#e8e9df]/20 transition-colors duration-300 border-2 border-[#e8e9df]/20 rounded-xl shadow-xl bg-gray-900/50">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-light mb-2 text-[#e8e9df]">
              {prd.title}
            </h2>
            <p className="text-sm text-gray-400 font-light">
              Version {prd.version}
            </p>
          </div>
          <span className="px-3 py-1 bg-[#e8e9df]/20 text-[#e8e9df] rounded-full text-sm font-light hover:bg-[#e8e9df]/30 cursor-pointer transition-colors duration-200">
            View Summary
          </span>
        </div>

        <div className="space-y-6">
          <Section title="Executive Summary">{prd.description}</Section>

          <Section title="Key Features">
            <ul className="list-disc list-inside space-y-2">
              {prd.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Section>

          <Section title="Project Timeline & Budget">
            <div className="space-y-2">
              <Requirement
                label="Development Timeline"
                value={prd.timeline.development}
              />
              <Requirement label="Initial MVP" value={prd.timeline.mvp} />
              <Requirement
                label="Est. Budget Range"
                value={prd.timeline.budget}
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PRDCard;
