import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isAi, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn("flex w-full mb-4", isAi ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "message-bubble",
          isAi
            ? "bg-accent text-accent-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm">{message}</p>
        <span className="text-xs opacity-50 mt-1 block">{timestamp}</span>
      </div>
    </div>
  );
};
