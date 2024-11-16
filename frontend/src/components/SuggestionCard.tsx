import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface SuggestionCardProps {
  title: string;
  description: string;
  onAccept: () => void;
  onDecline: () => void;
}

export const SuggestionCard = ({
  title,
  description,
  onAccept,
  onDecline,
}: SuggestionCardProps) => {
  return (
    <div className="bg-accent rounded-lg p-4 mb-4 animate-fade-in">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex gap-2">
        <Button
          onClick={onAccept}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          <Check className="w-4 h-4 mr-2" />
          Accept
        </Button>
        <Button
          onClick={onDecline}
          variant="outline"
          className="flex-1"
        >
          <X className="w-4 h-4 mr-2" />
          Decline
        </Button>
      </div>
    </div>
  );
};