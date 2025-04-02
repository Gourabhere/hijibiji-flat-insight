
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Upload, File, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const WhatsAppUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
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
        setUploadProgress(0);
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
    setUploadProgress(0);
    
    // Simulate upload process with progress updates
    try {
      // In a real implementation, you would send the file to your backend here
      // and track the upload progress
      
      // Simulate progress updates
      const totalSteps = 10;
      for (let step = 1; step <= totalSteps; step++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(Math.floor((step / totalSteps) * 100));
      }
      
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
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Upload Successful</AlertTitle>
            <AlertDescription className="text-green-600">
              WhatsApp chat export processed successfully
            </AlertDescription>
          </Alert>
        );
      case "error":
        return (
          <Alert className="mt-4 bg-red-50 border-red-200" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upload Failed</AlertTitle>
            <AlertDescription>
              Failed to process WhatsApp chat export
            </AlertDescription>
          </Alert>
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
