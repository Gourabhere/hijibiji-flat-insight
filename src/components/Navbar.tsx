
import { Bell, Home, MessageSquare, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">HijiBiji</span>
          <span className="text-sm font-medium text-muted-foreground">Flat Insight</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>Documents</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>Community</span>
          </Button>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
