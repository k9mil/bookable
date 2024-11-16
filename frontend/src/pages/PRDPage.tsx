import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation, Navigate } from "react-router-dom";

interface PRDSection {
  title: string;
  content: string[];
}

const PRDPage = () => {
  const [prdContent, setPrdContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [parsedSections, setParsedSections] = useState<PRDSection[]>([]);
  const location = useLocation();
  const requirements = location.state?.requirements;

  useEffect(() => {
    if (requirements) {
      fetchPRD();
    }
  }, [requirements]);

  // Redirect if no requirements were passed
  if (!requirements) {
    return <Navigate to="/consult" replace />;
  }

  const parseMarkdownSections = (markdown: string) => {
    const sections: PRDSection[] = [];
    const lines = markdown.split('\n');
    let currentSection: PRDSection = { title: '', content: [] };

    lines.forEach(line => {
      if (line.startsWith('#')) {
        if (currentSection.title) {
          sections.push({ ...currentSection });
        }
        currentSection = { title: line.replace(/#/g, '').trim(), content: [] };
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
      const response = await fetch("http://127.0.0.1:5000/api/v1/generate-prd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirements: requirements.map(req => req.description)
        }),
      });

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
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Product Requirements Document
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="space-y-8">
                {parsedSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary border-b border-primary/20 pb-2">
                      {section.title}
                    </h2>
                    <div className="space-y-2 pl-4">
                      {section.content.map((content, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {content.startsWith('-') ? (
                            <span className="flex">
                              <span className="text-primary mr-2">•</span>
                              {content.replace('-', '').trim()}
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
  );
};

export default PRDPage; 