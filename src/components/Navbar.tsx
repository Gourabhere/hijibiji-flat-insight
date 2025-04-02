
import { Bell, Home, MessageSquare, FileText, User, Menu, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">HijiBiji</span>
          <span className="text-sm font-medium text-muted-foreground">Flat Insight</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <a href="/">
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <a href="/documents">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <a href="/community">
              <MessageSquare className="w-4 h-4" />
              <span>Community</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
            <a href="/gallery">
              <Image className="w-4 h-4" />
              <span>Gallery</span>
            </a>
          </Button>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <a href="/admin">
              <User className="w-5 h-5" />
            </a>
          </Button>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" size="sm" className="flex items-center justify-start gap-3" asChild>
                  <a href="/">
                    <Home className="w-5 h-5" />
                    <span>Dashboard</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center justify-start gap-3" asChild>
                  <a href="/documents">
                    <FileText className="w-5 h-5" />
                    <span>Documents</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center justify-start gap-3" asChild>
                  <a href="/community">
                    <MessageSquare className="w-5 h-5" />
                    <span>Community</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center justify-start gap-3" asChild>
                  <a href="/gallery">
                    <Image className="w-5 h-5" />
                    <span>Gallery</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center justify-start gap-3" asChild>
                  <a href="/admin">
                    <User className="w-5 h-5" />
                    <span>Admin Area</span>
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
