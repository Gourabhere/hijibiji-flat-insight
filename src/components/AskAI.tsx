
import { useState } from "react";
import { Search, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestedQuestions = [
  "What is the current project status?",
  "What legal actions can be taken?",
  "What does the RERA complaint status show?",
  "What's the latest construction update?",
];

const AskAI = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setAnswer(
        "Based on the latest updates from site visits and builder communications, the project is currently at 70% completion. The main structure is complete, but interior work and utilities are still pending. The latest estimated handover is September 2025, but given past delays, buyers should continue monitoring progress closely."
      );
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
        <CardDescription>Get insights from project documents & discussions</CardDescription>
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
              <p className="text-sm text-muted-foreground">Analyzing documents and community updates...</p>
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
