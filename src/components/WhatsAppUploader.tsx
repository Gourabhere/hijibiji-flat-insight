
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const WhatsAppUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check if the file is a zip file
      if (selectedFile.type === "application/zip" || 
          selectedFile.type === "application/x-zip-compressed" || 
          selectedFile.name.endsWith(".zip")) {
        setFile(selectedFile);
        setUploadStatus("idle");
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a ZIP file containing WhatsApp chat exports",
          variant: "destructive",
        });
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload process
    try {
      // In a real implementation, you would send the file to your backend here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus("success");
      toast({
        title: "Upload successful",
        description: "WhatsApp chat export has been processed",
      });
    } catch (error) {
      setUploadStatus("error");
      toast({
        title: "Upload failed",
        description: "There was an error processing your file",
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
          <div className="flex items-center gap-2 text-green-600 mt-3">
            <CheckCircle className="w-5 h-5" />
            <span>WhatsApp chat export processed successfully</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 text-red-600 mt-3">
            <AlertCircle className="w-5 h-5" />
            <span>Failed to process WhatsApp chat export</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload WhatsApp Conversations</CardTitle>
        <CardDescription>
          Upload a ZIP file containing your WhatsApp chat exports for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <MessageSquare className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          
          {file ? (
            <div className="py-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <File className="w-5 h-5 text-primary" />
                <span className="font-medium">{file.name}</span>
                <span className="text-sm text-muted-foreground">
                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
              
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                className="w-full sm:w-auto"
              >
                {isUploading ? "Processing..." : "Upload and Process"}
                <Upload className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your WhatsApp chat export as a ZIP file
              </p>
              <label className="cursor-pointer">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Select ZIP File
                  <Upload className="ml-2 w-4 h-4" />
                </div>
                <input 
                  type="file" 
                  accept=".zip,application/zip,application/x-zip-compressed" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </>
          )}
          
          {renderUploadStatus()}
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="font-medium">Important notes:</p>
          <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
            <li>WhatsApp chat exports must be in ZIP format</li>
            <li>Conversations will only be visible to administrators</li>
            <li>Large ZIP files may take longer to process</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppUploader;
