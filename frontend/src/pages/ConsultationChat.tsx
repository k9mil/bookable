import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { SuggestionCard } from "@/components/SuggestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AudioRecorder from "./AudioRecorder";
import { FinishModal } from "@/components/FinishModal";

interface AIResponse {
  done: boolean;
  current_state?: {
    core_product_purpose: string | null;
    product_description: string | null;
    users_of_system: string | null;
    timeline: string | null;
    budget: string | null;
  };
  main_response: string;
  suggested_requirements?: string[];
}

interface Requirement {
  id: number;
  description: string;
  timestamp: string;
}

interface Suggestion {
  id: number;
  description: string;
  visible: boolean;
}

const ConsultationChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I'm here to help turn your product idea into reality. Whether you have a rough concept or a detailed vision, I'll guide you through the process of creating a market-ready product. Let's start by hearing about your idea.",
      isAi: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [currentState, setCurrentState] = useState<AIResponse["current_state"]>(
    {
      core_product_purpose: null,
      product_description: null,
      users_of_system: null,
      timeline: null,
      budget: null,
    }
  );
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [rejectedRequirements, setRejectedRequirements] = useState<
    Requirement[]
  >([]);
  const [finishModalOpen, setFinishModalOpen] = useState(false);

  const sendMessageToAI = async (userMessage: string) => {
    try {
      let requestBody;

      if (requirements.length > 0) {
        requestBody = {
          current_state: currentState,
          current_requirements: requirements.map((req) => req.description),
          rejected_requirements: rejectedRequirements.map(
            (req) => req.description
          ),
          user_message: userMessage,
        };
      } else {
        requestBody = {
          current_state: currentState,
          user_message: userMessage,
        };
      }

      const response = await fetch("http://127.0.0.1:5000/api/v1/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data as AIResponse;
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Unable to fetch AI response.");
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    const userMessage = {
      message: input,
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const aiResponse = await sendMessageToAI(input);

      if (aiResponse) {
        console.log("Done flag:", aiResponse);
        setMessages((prev) => [
          ...prev,
          {
            message: aiResponse.main_response,
            isAi: true,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        if (aiResponse.current_state) {
          setCurrentState(aiResponse.current_state);
        }

        setDone(aiResponse.done);

        if (aiResponse.suggested_requirements) {
          setSuggestions(
            aiResponse.suggested_requirements.map((suggestion, index) => ({
              id: Date.now() + index,
              description: suggestion,
              visible: true,
            }))
          );
        }
      }
    } catch {
      // Error logging is already handled in sendMessageToAI.
    } finally {
      setLoading(false);
    }
  };

  const handleTranscriptionComplete = (transcription) => {
    setInput(transcription);
  };

  const handleAccept = (suggestion: Suggestion) => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === suggestion.id ? { ...s, visible: false } : s))
    );

    setRequirements((prev) => [
      ...prev,
      {
        id: suggestion.id,
        description: suggestion.description,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    toast.success("Requirement added!");
  };

  const handleDecline = (id: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, visible: false } : suggestion
      )
    );

    const declinedSuggestion = suggestions.find((s) => s.id === id);

    if (declinedSuggestion) {
      setRejectedRequirements((prev) => [
        ...prev,
        {
          id: declinedSuggestion.id,
          description: declinedSuggestion.description,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }

    toast.error("Suggestion declined");
  };

  const handleDeleteRequirement = (id: number) => {
    setRequirements((prev) => prev.filter((req) => req.id !== id));
    toast.info("Requirement removed");
  };

  const handleFinish = () => {
    setFinishModalOpen(true);
  };

  const RequirementCard = ({ requirement }: { requirement: Requirement }) => (
    <div className="bg-card rounded-lg p-4 mb-4 shadow-sm relative group">
      <button
        onClick={() => handleDeleteRequirement(requirement.id)}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
      </button>
      <p className="text-sm text-card-foreground pr-6">
        {requirement.description}
      </p>
      <p className="text-xs text-muted-foreground mt-2">
        Added at {requirement.timestamp}
      </p>
    </div>
  );

  return (
    <div className="flex h-screen bg-muted">
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg.message}
              isAi={msg.isAi}
              timestamp={msg.timestamp}
            />
          ))}
          {done && (
            <div className="p-4 bg-green-100 text-green-700 text-center rounded-md">
              The consultation is complete. 🎉
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
            disabled={loading}
          />
          <AudioRecorder
            onTranscriptionComplete={handleTranscriptionComplete}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="w-80 bg-accent p-4 overflow-y-auto scrollbar-hide">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Requirements</h2>
            {requirements.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleFinish}
                className="flex items-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Finish
              </Button>
            )}
          </div>
          {requirements.length > 0 ? (
            requirements.map((requirement) => (
              <RequirementCard key={requirement.id} requirement={requirement} />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No requirements added yet. Accept suggestions to add them here.
            </p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Suggested Requirements</h2>
          {suggestions.filter((s) => s.visible).length > 0 ? (
            suggestions
              .filter((suggestion) => suggestion.visible)
              .map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  title="Feature Suggestion"
                  description={suggestion.description}
                  onAccept={() => handleAccept(suggestion)}
                  onDecline={() => handleDecline(suggestion.id)}
                />
              ))
          ) : (
            <p className="text-muted-foreground text-sm">
              No new suggestions available yet. Continue the conversation to
              receive recommendations.
            </p>
          )}
        </div>
      </div>
      <FinishModal
        open={finishModalOpen}
        onOpenChange={setFinishModalOpen}
        requirements={requirements.map(req => req.description)}
        currentState={currentState}
      />
    </div>
  );
};

export default ConsultationChat;
