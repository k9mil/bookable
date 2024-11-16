import StatusBadge from "@/components/StatusBadge";
import BudgetCard from "@/components/BudgetCard";
import TimelineCard from "@/components/TimelineCard";
import ContactCard from "@/components/ContactCard";
import RequirementsList from "@/components/RequirementsList";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <StatusBadge />
          <h1 className="text-4xl font-bold">Project Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Track your project's progress, requirements, and timeline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RequirementsList />
          <div className="space-y-6">
            <TimelineCard />
            <BudgetCard />
          </div>
        </div>

        <ContactCard />
      </div>
    </div>
  );
};

export default Dashboard;
