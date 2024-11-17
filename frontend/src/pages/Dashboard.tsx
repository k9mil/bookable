import StatusBadge from "@/components/StatusBadge";
import BudgetCard from "@/components/BudgetCard";
import TimelineCard from "@/components/TimelineCard";
import ContactCard from "@/components/ContactCard";
import RequirementsList from "@/components/RequirementsList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [requirements, setRequirements] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [budget, setBudget] = useState(2000);
  const navigate = useNavigate();

  useEffect(() => {
    const prdContent = localStorage.getItem("prd_content");
    if (!prdContent) {
      navigate("/samaltman/chat", { replace: true });
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/v1/prd-to-json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prd: prdContent,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setRequirements(data.requirements);
        setMilestones(data.milestones);
        setBudget(2000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="min-h-screen p-6 md:p-8 bg-muted">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4">
          <StatusBadge />
          <h1 className="text-4xl font-bold">Project Summary</h1>
          <p className="text-gray-400 text-lg">
            Track the project's progress, requirements, and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RequirementsList content={requirements} />
          <div className="space-y-6">
            <TimelineCard content={milestones} />
            <BudgetCard content={budget} />
          </div>
        </div>

        <ContactCard />
      </div>
    </div>
  );
};

export default Dashboard;
