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
  requirements: Requirement[];
  currentState: Record<string, unknown>;
  prdContent?: string;
};

interface Requirement {
  id: number;
  description: string;
  timestamp: string;
}

export const FinishModal = ({
  open,
  onOpenChange,
  requirements,
  currentState,
  prdContent,
}: FinishModalProps) => {
  const navigate = useNavigate();

  const handlePRDNavigation = () => {
    navigate("/prd", {
      state: {
        requirements: requirements,
        current_state: currentState,
      },
    });
  };

  const handleDashboardNavigation = () => {
    if (prdContent) {
      localStorage.setItem('prd_content', prdContent);
      navigate("/dashboard");
    } else {
      handlePRDNavigation();
    }
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
          <Button
            onClick={handleDashboardNavigation}
            variant="outline"
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
