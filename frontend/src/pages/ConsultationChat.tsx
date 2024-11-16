import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface AIResponse {
  done: boolean;
  current_state: {
    core_product_purpose: string | null;
    key_stakeholders: string | null;
    product_description: string | null;
  };
  main_response: string;
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
  const [currentState, setCurrentState] = useState<AIResponse["current_state"]>(
    {
      core_product_purpose: null,
      key_stakeholders: null,
      product_description: null,
    }
  );
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessageToAI = async (userMessage: string) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_state: currentState,
          user_message: userMessage,
        }),
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
        setMessages((prev) => [
          ...prev,
          {
            message: aiResponse.main_response,
            isAi: true,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);

        setCurrentState(aiResponse.current_state);
        setDone(aiResponse.done);
      }
    } catch {
      // Error logging is already handled in sendMessageToAI.
    } finally {
      setLoading(false);
    }
  };

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
          <Button onClick={handleSend} disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {done && (
        <div className="p-4 bg-green-100 text-green-700 text-center">
          The consultation is complete. 🎉
        </div>
      )}
    </div>
  );
};

export default ConsultationChat;
