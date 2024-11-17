import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PRDSection {
  title: string;
  content: string[];
}

const PRDPage = () => {
  const [prdContent, setPrdContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [parsedSections, setParsedSections] = useState<PRDSection[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const requirements = location.state?.requirements;
  const current_state = location.state?.current_state;

  useEffect(() => {
    if (requirements) {
      fetchPRD();
    }
  }, [requirements]);

  if (!requirements) {
    return <Navigate to="/samaltman/chat" replace />;
  }

  const handleViewDashboard = () => {
    localStorage.setItem("prd_content", prdContent);
    navigate("/summary");
  };

  const parseMarkdownSections = (markdown: string) => {
    const sections: PRDSection[] = [];
    const lines = markdown.split("\n");
    let currentSection: PRDSection = { title: "", content: [] };

    lines.forEach((line) => {
      if (line.startsWith("#")) {
        if (currentSection.title) {
          sections.push({ ...currentSection });
        }
        currentSection = { title: line.replace(/#/g, "").trim(), content: [] };
      } else if (line.trim() && currentSection.title) {
        currentSection.content.push(line.trim());
      }
    });

    if (currentSection.title) {
      sections.push(currentSection);
    }

    return sections;
  };

  const fetchPRD = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/generate-prd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requirements: requirements.map((req) => req.description),
            current_state: current_state,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PRD");
      }

      const data = await response.json();
      setPrdContent(data.prd);
      setParsedSections(parseMarkdownSections(data.prd));
    } catch (error) {
      console.error("Error generating PRD:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <CardHeader className="border-b border-zinc-800 flex flex-row justify-between items-center">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Product Requirements Document
            </CardTitle>
            <Button
              onClick={handleViewDashboard}
              disabled={!prdContent || loading}
              className="ml-4"
            >
              View Dashboard
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[700px]">
              {loading ? (
                <div className="space-y-6 p-6">
                  <Skeleton className="h-8 w-3/4 bg-zinc-800" />
                  <Skeleton className="h-24 w-full bg-zinc-800" />
                  <Skeleton className="h-8 w-2/3 bg-zinc-800" />
                  <Skeleton className="h-32 w-full bg-zinc-800" />
                  <Skeleton className="h-8 w-3/4 bg-zinc-800" />
                  <Skeleton className="h-24 w-full bg-zinc-800" />
                </div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {parsedSections.map((section, index) => (
                    <div key={index} className="p-6 space-y-4">
                      <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                        {section.title}
                      </h2>
                      <div className="space-y-3">
                        {section.content.map((content, idx) => (
                          <p
                            key={idx}
                            className="text-zinc-400 leading-relaxed"
                          >
                            {content.startsWith("-") ? (
                              <span className="flex items-start">
                                <span className="text-white mr-3 mt-1.5">
                                  •
                                </span>
                                <span>{content.replace("-", "").trim()}</span>
                              </span>
                            ) : (
                              content
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PRDPage;
