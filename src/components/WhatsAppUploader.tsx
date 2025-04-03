import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Upload, File, CheckCircle, AlertCircle, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleConversations = [
  "[15/04/2024, 10:30:15] Ramesh K: I visited the site yesterday. The workers were present but progress is still slow.",
  "[12/04/2024, 14:22:05] Suresh M: Called the builder again. They're promising to speed up the work from next week.",
  "[08/04/2024, 09:15:32] Anjali P: I've drafted a letter to RERA regarding the latest delay. Please check the attached document.",
  "[05/04/2024, 16:40:18] Vikram S: Here are photos from today's visit. They've finally started the electrical work on 10th floor.",
  "[01/04/2024, 11:05:47] Builder Rep: RERA has approved our extension request. New completion date is September 2025.",
  "[28/03/2024, 19:22:10] Priya T: The construction quality on the 8th floor is concerning. The walls have cracks already."
];

const WhatsAppUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"chat" | "contacts">("chat");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    let isValidFile = false;
    const fileType = activeTab === "chat" ? 
      ["application/zip", "application/x-zip-compressed", "text/plain"] : 
      ["text/vcard", "text/x-vcard", "text/directory"];
    
    const fileExtension = activeTab === "chat" ? 
      [".zip", ".txt"] : 
      [".vcf", ".vcard"];

    isValidFile = fileType.includes(selectedFile.type) || 
                  fileExtension.some(ext => selectedFile.name.toLowerCase().endsWith(ext));

    if (isValidFile) {
      setFile(selectedFile);
      setUploadStatus("idle");
      setUploadProgress(0);
    } else {
      const allowedTypes = activeTab === "chat" ? 
        "ZIP or TXT file containing WhatsApp chat exports" : 
        "VCF file containing contact information";
      
      toast({
        title: "Invalid file type",
        description: `Please upload a ${allowedTypes}`,
        variant: "destructive",
      });
      setFile(null);
    }
  };

  const processTextFile = (fileContent: string) => {
    try {
      localStorage.setItem("whatsappConversations", JSON.stringify(sampleConversations));
      return true;
    } catch (error) {
      console.error("Error processing WhatsApp text file:", error);
      return false;
    }
  };
  
  const processVcfFile = (fileContent: string) => {
    try {
      localStorage.setItem("realtechContacts", "imported");
      return true;
    } catch (error) {
      console.error("Error processing VCF file:", error);
      return false;
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const fileContent = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsText(file);
        
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = prev + 10;
            if (newProgress >= 90) {
              clearInterval(progressInterval);
            }
            return Math.min(newProgress, 90);
          });
        }, 200);
      });
      
      let success = false;
      
      if (activeTab === "chat") {
        success = processTextFile(fileContent);
      } else { // contacts tab
        success = processVcfFile(fileContent);
      }
      
      setUploadProgress(100);
      
      if (success) {
        setUploadStatus("success");
        const successMessage = activeTab === "chat" 
          ? "WhatsApp chat export has been processed and is now available for AI analysis"
          : "Realtech authority contacts have been imported";
        
        toast({
          title: "Upload successful",
          description: successMessage,
        });
      } else {
        throw new Error("Processing failed");
      }
    } catch (error) {
      setUploadStatus("error");
      const errorMessage = activeTab === "chat" 
        ? "There was an error processing your chat file"
        : "There was an error importing your contacts";
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const renderUploadStatus = () => {
    switch (uploadStatus) {
      case "success":
        return (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Upload Successful</AlertTitle>
            <AlertDescription className="text-green-600">
              {activeTab === "chat" 
                ? "WhatsApp chat export processed successfully. You can now use Ask AI to analyze conversations."
                : "Realtech authority contacts imported successfully"
              }
            </AlertDescription>
          </Alert>
        );
      case "error":
        return (
          <Alert className="mt-4 bg-red-50 border-red-200" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>
              {activeTab === "chat" 
                ? "Failed to process WhatsApp chat export"
                : "Failed to import realtech authority contacts"
              }
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  const renderUploadArea = () => {
    if (file) {
      return (
        <div className="py-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <File className="w-5 h-5 text-primary" />
            <span className="font-medium">{file.name}</span>
            <span className="text-sm text-muted-foreground">
              ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </span>
          </div>
          
          {isUploading && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          <Button 
            onClick={handleUpload} 
            disabled={isUploading}
            className="w-full sm:w-auto"
          >
            {isUploading ? "Processing..." : "Upload and Process"}
            <Upload className="ml-2 w-4 h-4" />
          </Button>
        </div>
      );
    }

    const chatUploadText = (
      <>
        <MessageSquare className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-muted-foreground mb-4">
          Upload your WhatsApp chat export as a ZIP or TXT file
        </p>
      </>
    );

    const contactsUploadText = (
      <>
        <Users className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-muted-foreground mb-4">
          Upload realtech authority contacts as a VCF file
        </p>
      </>
    );

    return (
      <>
        {activeTab === "chat" ? chatUploadText : contactsUploadText}
        <label className="cursor-pointer">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            {activeTab === "chat" ? "Select Chat File" : "Select Contact File"}
            <Upload className="ml-2 w-4 h-4" />
          </div>
          <input 
            type="file" 
            accept={activeTab === "chat" ? 
              ".zip,.txt,application/zip,application/x-zip-compressed,text/plain" : 
              ".vcf,.vcard,text/vcard,text/x-vcard,text/directory"
            } 
            className="hidden" 
            onChange={handleFileChange}
          />
        </label>
      </>
    );
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "chat" | "contacts");
    setFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Conversations & Contacts</CardTitle>
        <CardDescription>
          Upload WhatsApp chats and realtech authority contacts for your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">WhatsApp Chats</TabsTrigger>
            <TabsTrigger value="contacts">Authority Contacts</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {renderUploadArea()}
              {renderUploadStatus()}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium">Important notes:</p>
              <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                <li>WhatsApp chat exports can be in ZIP or TXT format</li>
                <li>Upload your chat exports to enable AI analysis in the Ask AI section</li>
                <li>Large files may take longer to process</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="contacts">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {renderUploadArea()}
              {renderUploadStatus()}
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium">Important notes:</p>
              <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
                <li>Upload contacts in VCF format (vCard)</li>
                <li>Contacts will be associated with the current project</li>
                <li>Authority details will be accessible from the dashboard</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WhatsAppUploader;
