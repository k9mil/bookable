import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const StatusBadge = () => {
  return (
    <Badge className="bg-[#fbbf24]/20 text-[#fbbf24] hover:bg-[#fbbf24]/30 border-0 gap-1 px-3 py-1 w-fit">
      <Clock className="w-4 h-4" />
      Pending Project
    </Badge>
  );
};

export default StatusBadge;
