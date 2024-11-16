import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { SuggestionCard } from "@/components/SuggestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { PRDModal } from "@/components/PRDModal";
import { Question, ProjectInfo } from "@/types/consultation";

interface AIResponse {
  main_response: string;
  suggestions?: string[];
}

const ConsultationChat = () => {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! I'm here to help turn your product idea into reality. Whether you have a rough concept or a detailed vision, I'll guide you through the process of creating a market-ready product. Let's start by hearing about your idea.",
      isAi: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [projectInfo, setProjectInfo] = useState<Partial<ProjectInfo>>({});
  const [prdGenerated, setPrdGenerated] = useState(false);
  const [showPRDModal, setShowPRDModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    Array<{
      id: number;
      description: string;
      visible: boolean;
    }>
  >([]);

  const sendMessageToAI = async (userMessage: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const parsedResponse: AIResponse = JSON.parse(data.response);
      return parsedResponse;
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get AI response");
      throw error;
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

      setMessages((prev) => [
        ...prev,
        {
          message: aiResponse.main_response,
          isAi: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);

      if (aiResponse.suggestions) {
        setSuggestions(
          aiResponse.suggestions.map((suggestion, index) => ({
            id: index + 1,
            description: suggestion,
            visible: true,
          }))
        );
      }
    } catch (error) {
      console.error("Error in handleSend:", error);
      toast.error("Failed to process message");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = (id: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, visible: false } : suggestion
      )
    );
    toast.success("Suggestion accepted!");
  };

  const handleDecline = (id: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, visible: false } : suggestion
      )
    );
    toast.error("Suggestion declined");
  };

  return (
    <div className="flex h-screen bg-muted">
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} {...msg} />
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="w-80 bg-accent p-4 overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
        {suggestions
          .filter((suggestion) => suggestion.visible)
          .map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              title="Feature Suggestion"
              description={suggestion.description}
              onAccept={() => handleAccept(suggestion.id)}
              onDecline={() => handleDecline(suggestion.id)}
            />
          ))}
      </div>

      <PRDModal
        open={showPRDModal}
        onOpenChange={setShowPRDModal}
        projectInfo={projectInfo}
      />
    </div>
  );
};

export default ConsultationChat;
