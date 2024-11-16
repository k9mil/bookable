import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectInfo } from "@/types/consultation";
import { generatePRD } from "@/utils/prd";

type PRDModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectInfo: Partial<ProjectInfo>;
};

export const PRDModal = ({ open, onOpenChange, projectInfo }: PRDModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Product Requirements Document</DialogTitle>
      </DialogHeader>
      <div className="whitespace-pre-wrap font-mono text-sm">
        {projectInfo && generatePRD(projectInfo as ProjectInfo)}
      </div>
    </DialogContent>
  </Dialog>
);