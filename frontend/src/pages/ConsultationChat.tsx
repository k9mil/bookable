import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { SuggestionCard } from "@/components/SuggestionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { PRDModal } from "@/components/PRDModal";
import { Question, ProjectInfo } from "@/types/consultation";

const questions: Question[] = [
  { id: 1, text: "What problem does your idea solve?", key: "problemStatement" },
  { id: 2, text: "Who is your target audience?", key: "targetAudience" },
  { id: 3, text: "What are the key features you envision?", key: "keyFeatures" },
  { id: 4, text: "How will you measure success?", key: "successMetrics" },
  { id: 5, text: "What's your expected timeline?", key: "timeline" },
];

const ConsultationChat = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hi! I'm your AI consultant. Let's discuss your business idea. What problem does your idea solve?",
      isAi: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [projectInfo, setProjectInfo] = useState<Partial<ProjectInfo>>({});
  const [prdGenerated, setPrdGenerated] = useState(false);
  const [showPRDModal, setShowPRDModal] = useState(false);
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: "Mobile App Development",
      description: "Based on your requirements, a mobile app would be ideal for reaching your target audience.",
      visible: true,
    },
    {
      id: 2,
      title: "Marketing Strategy",
      description: "Consider implementing a social media marketing campaign to increase visibility.",
      visible: true,
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      message: input,
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      setProjectInfo((prev) => ({
        ...prev,
        [currentQuestion.key]: input,
      }));

      if (currentQuestionIndex < questions.length - 1) {
        const nextQuestion = questions[currentQuestionIndex + 1];
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              message: nextQuestion.text,
              isAi: true,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }, 1000);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              message: "Thank you for providing all the information. I've generated a PRD based on your responses.",
              isAi: true,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          setPrdGenerated(true);
          setShowPRDModal(true);
          toast.success("PRD has been generated!");
        }, 1000);
      }
    }
  };

  const handleAccept = (id: number) => {
    setSuggestions(prev =>
      prev.map(suggestion =>
        suggestion.id === id ? { ...suggestion, visible: false } : suggestion
      )
    );
    toast.success("Suggestion accepted!");
  };

  const handleDecline = (id: number) => {
    setSuggestions(prev =>
      prev.map(suggestion =>
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
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="w-80 bg-accent p-4 overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
        {suggestions
          .filter(suggestion => suggestion.visible)
          .map((suggestion) => (
            <SuggestionCard
              key={suggestion.id}
              title={suggestion.title}
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