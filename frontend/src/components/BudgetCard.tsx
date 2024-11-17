import { Progress } from "@/components/ui/progress";

interface BudgetCardProps {
  content: number;
}

const BudgetCard = ({ content }: BudgetCardProps) => {
  console.log(content);
  return (
    <div className="card animate-fade-in animate-delay-1">
      <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Budget</span>
          <span className="text-gray-300 font-semibold">£{content}</span>
        </div>
        <Progress value={50} className="h-2 bg-gray-800" />
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Used: £0</span>
          <span className="text-gray-300">Available: £{content}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
