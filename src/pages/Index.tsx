
import Navbar from "@/components/Navbar";
import ProjectTimeline from "@/components/ProjectTimeline";
import DocumentRepository from "@/components/DocumentRepository";
import CommunityUpdates from "@/components/CommunityUpdates";
import AskAI from "@/components/AskAI";
import ProgressTracker from "@/components/ProgressTracker";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Hijibiji Flat Insight</h1>
          <p className="text-muted-foreground">Track your investment and stay updated</p>
        </div>
        
        {/* Project Alert */}
        <div className="flex items-start gap-3 p-4 bg-accent/20 border border-accent/30 rounded-lg mb-6">
          <Info className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium">Important Update</h3>
            <p className="text-sm">The builder has requested another extension from RERA. A hearing is scheduled for July 15, 2024. <Button variant="link" className="h-auto p-0 text-primary">Read more</Button></p>
          </div>
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProjectTimeline />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <DocumentRepository />
          </div>
          
          <div className="col-span-1 lg:row-span-2">
            <CommunityUpdates />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <AskAI />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <ProgressTracker />
          </div>
        </div>
      </main>
      
      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 Hijibiji Flat Insight • A community initiative by flat owners
        </div>
      </footer>
    </div>
  );
};

export default Index;
