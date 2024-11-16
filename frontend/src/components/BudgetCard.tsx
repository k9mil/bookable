import { Progress } from "@/components/ui/progress";

const BudgetCard = () => {
  return (
    <div className="card animate-fade-in animate-delay-1">
      <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Budget</span>
          <span className="text-gray-300 font-semibold">$0</span>
        </div>
        <Progress value={0} className="h-2 bg-gray-800" />
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Used: $0</span>
          <span className="text-gray-300">Available: $0</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
