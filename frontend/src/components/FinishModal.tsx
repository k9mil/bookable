import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type FinishModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requirements: string[];
  currentState: Record<string, unknown>;
};

export const FinishModal = ({ 
  open, 
  onOpenChange, 
  requirements, 
  currentState 
}: FinishModalProps) => {
  const navigate = useNavigate();

  const handlePRDNavigation = () => {
    navigate("/prd", {
      state: {
        requirements: requirements,
        current_state: currentState
      },
    });
  };

  const handleDashboardNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Next Step</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button onClick={handlePRDNavigation} className="w-full">
            View PRD
          </Button>
          <Button onClick={handleDashboardNavigation} variant="outline" className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 