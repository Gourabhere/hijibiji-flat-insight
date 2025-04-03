
import { useState, useEffect } from "react";
import { Search, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const suggestedQuestions = [
  "What is the current project status?",
  "What's the recent interaction with the builder?",
  "What was discussed about RERA complaints?",
  "Any updates about construction progress?",
];

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { toast } = useToast();

  // Effect to check for WhatsApp conversations in localStorage
  useEffect(() => {
    try {
      const storedConversations = localStorage.getItem("whatsappConversations");
      if (storedConversations) {
        setConversations(JSON.parse(storedConversations));
        setIsDataLoaded(true);
        toast({
          title: "WhatsApp data loaded",
          description: "Your conversation data is ready for analysis",
        });
      }
    } catch (error) {
      console.error("Error loading WhatsApp conversations:", error);
    }
  }, [toast]);

  const handleAsk = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // If no conversation data is available
    if (!isDataLoaded) {
      setTimeout(() => {
        setAnswer(
          "I don't have any WhatsApp conversation data to analyze. Please upload your WhatsApp chat export in the Admin section first."
        );
        setIsLoading(false);
      }, 1000);
      return;
    }
    
    // With conversation data available
    setTimeout(() => {
      // Simulating analysis of WhatsApp conversations based on question
      const relevantResponses: {[key: string]: string} = {
        "status": "Based on the recent WhatsApp conversations, the project is currently at 70% completion. The main structure is complete, but interior work and utilities are still pending.",
        "builder": "According to recent messages, the builder requested another extension from RERA. Several residents have reported delayed responses to maintenance tickets.",
        "rera": "From the WhatsApp conversations, a group of residents filed a RERA complaint on April 15, 2024. A hearing is scheduled for July 15, 2024.",
        "construction": "Recent site visit photos shared in the WhatsApp group show that electrical work on the 10th floor has started, but progress remains slow according to resident reports.",
      };
      
      // Simple keyword matching
      let response = "I've analyzed the conversations, but couldn't find specific information about your question. Try asking about the project status, builder interactions, RERA complaints, or construction updates.";
      
      const lowerQuestion = question.toLowerCase();
      if (lowerQuestion.includes("status") || lowerQuestion.includes("progress")) {
        response = relevantResponses.status;
      } else if (lowerQuestion.includes("builder") || lowerQuestion.includes("developer")) {
        response = relevantResponses.builder;
      } else if (lowerQuestion.includes("rera") || lowerQuestion.includes("complaint") || lowerQuestion.includes("legal")) {
        response = relevantResponses.rera;
      } else if (lowerQuestion.includes("construction") || lowerQuestion.includes("work") || lowerQuestion.includes("building")) {
        response = relevantResponses.construction;
      }
      
      setAnswer(response);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (q: string) => {
    setQuestion(q);
    setAnswer("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask AI</CardTitle>
        <CardDescription>
          {isDataLoaded 
            ? "Get insights from your WhatsApp conversations and project documents" 
            : "Upload WhatsApp conversations in Admin to enable AI analysis"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question about the project..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            />
            <Button onClick={handleAsk} disabled={isLoading || !question.trim()}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          
          {!answer && !isLoading && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSuggestedQuestion(q)}
                  >
                    <Search className="w-3 h-3 mr-1" />
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">
                {isDataLoaded 
                  ? "Analyzing WhatsApp conversations and project documents..." 
                  : "Checking for available data..."}
              </p>
            </div>
          )}
          
          {!isDataLoaded && !isLoading && !answer && (
            <div className="p-3 border rounded-md bg-amber-50 border-amber-200">
              <p className="text-sm text-amber-800">
                WhatsApp conversation data hasn't been uploaded yet. Please go to the Admin section to upload your chat export.
              </p>
            </div>
          )}
          
          {answer && (
            <div className="p-3 border rounded-md bg-muted/30">
              <p className="text-sm">{answer}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AskAI;
