
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MessageSquare, Upload, User, Lock, Image, FileText, Key } from "lucide-react";
import WhatsAppUploader from "@/components/WhatsAppUploader";
import { useToast } from "@/hooks/use-toast";

// Dummy WhatsApp conversations - would be replaced with actual data from backend
const whatsappConversations = [
  {
    id: 1,
    date: "May 12, 2024",
    sender: "Ramesh K.",
    message: "I visited the site yesterday. The workers were present but progress is still slow.",
    hasAttachments: true,
  },
  {
    id: 2,
    date: "May 10, 2024",
    sender: "Suresh M.",
    message: "Called the builder again. They're promising to speed up the work from next week.",
    hasAttachments: false,
  },
  {
    id: 3,
    date: "May 8, 2024",
    sender: "Anjali P.",
    message: "I've drafted a letter to RERA regarding the latest delay. Please check the attached document.",
    hasAttachments: true,
  },
  {
    id: 4,
    date: "May 5, 2024",
    sender: "Vikram S.",
    message: "Here are photos from today's visit. They've finally started the electrical work on 10th floor.",
    hasAttachments: true,
  },
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedApiKey = localStorage.getItem("geminiApiKey") || "";
      setApiKey(savedApiKey);
    }
  }, [isAuthenticated]);
  
  // Dummy authentication - would be replaced with real authentication
  const handleLogin = () => {
    if (password === "admin123") { // This is just for demonstration
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  // Save API key to localStorage
  const handleSaveApiKey = () => {
    localStorage.setItem("geminiApiKey", apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Admin Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Area</h1>
          <p className="text-muted-foreground">Manage WhatsApp conversations and site content</p>
        </div>
        
        {!isAuthenticated ? (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your password to access admin features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    className="w-full px-3 py-2 border rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Content Management Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* API Key Management Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Gemini API Key</CardTitle>
                  <CardDescription>Add your Gemini API key for AI analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">Gemini API Key</Label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Input
                            id="api-key"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your Gemini API key"
                          />
                          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                            <Key className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                          Save Key
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Get your Gemini API key from{" "}
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          Google AI Studio
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Uploader */}
              <div className="md:col-span-2">
                <WhatsAppUploader />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upload Media</CardTitle>
                  <CardDescription>Add photos and videos to the gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to upload images and videos
                    </p>
                    <Button>
                      Select Files
                      <Upload className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* WhatsApp Conversations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>WhatsApp Conversations</CardTitle>
                <CardDescription>Recent messages from the flat owners group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {whatsappConversations.map((conversation) => (
                    <div key={conversation.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{conversation.sender}</p>
                            <p className="text-xs text-muted-foreground">{conversation.date}</p>
                          </div>
                        </div>
                        {conversation.hasAttachments && (
                          <div className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded-full">
                            Has attachments
                          </div>
                        )}
                      </div>
                      <p className="text-sm">{conversation.message}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Load More Messages
                </Button>
              </CardContent>
            </Card>
            
            {/* Admin Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <FileText className="w-4 h-4" />
                    Upload Documents
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 justify-center">
                    <MessageSquare className="w-4 h-4" />
                    Export Conversations
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 justify-center text-red-500 hover:text-red-700"
                    onClick={() => setIsAuthenticated(false)}
                  >
                    <Lock className="w-4 h-4" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      
      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 Hijibiji Flat Insight • A community initiative by flat owners
        </div>
      </footer>
    </div>
  );
};

export default Admin;
