
import { FileText, Download, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const documents = [
  {
    title: "Original Contract Agreement",
    date: "June 2017",
    type: "Legal",
    size: "2.4 MB",
  },
  {
    title: "RERA Complaint Filing",
    date: "March 2023",
    type: "Legal",
    size: "1.8 MB",
  },
  {
    title: "Builder Extension Letter",
    date: "January 2024",
    type: "Communication",
    size: "560 KB",
  },
  {
    title: "Construction Progress Report",
    date: "April 2024",
    type: "Report",
    size: "3.2 MB",
  },
];

const DocumentRepository = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Repository</CardTitle>
        <CardDescription>All project-related documentation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{doc.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.date} • {doc.type} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Documents
        </Button>
      </CardContent>
    </Card>
  );
};

export default DocumentRepository;
