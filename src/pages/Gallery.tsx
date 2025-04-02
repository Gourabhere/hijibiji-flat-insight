
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image, FileVideo, Calendar } from "lucide-react";

// Dummy data - would be replaced with actual data from backend
const galleryItems = [
  {
    id: 1,
    type: "image",
    title: "Foundation Work",
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    date: "June 2017",
    description: "Initial foundation work started"
  },
  {
    id: 2,
    type: "image",
    title: "First Floor Construction",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    date: "March 2018",
    description: "First floor structure completed"
  },
  {
    id: 3,
    type: "video",
    title: "Team Meeting with Builder",
    src: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    date: "September 2019",
    description: "Discussion about project delays"
  },
  {
    id: 4,
    type: "image",
    title: "Current Construction Status",
    src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    date: "April 2024",
    description: "Recent site visit showing current progress"
  },
];

// Filter options for the gallery
const timelineYears = ["All", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
const typeOptions = ["All", "Images", "Videos"];

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  
  // Filter gallery items based on selection
  const filteredItems = galleryItems.filter(item => {
    const yearMatch = selectedYear === "All" || item.date.includes(selectedYear);
    const typeMatch = selectedType === "All" || 
                     (selectedType === "Images" && item.type === "image") ||
                     (selectedType === "Videos" && item.type === "video");
    return yearMatch && typeMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Gallery Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Project Gallery</h1>
          <p className="text-muted-foreground">Visual timeline of the construction progress</p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filter by Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {timelineYears.map(year => (
                  <Button 
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filter by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {typeOptions.map(type => (
                  <Button 
                    key={type} 
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className="flex items-center gap-1"
                  >
                    {type === "Images" && <Image className="w-4 h-4" />}
                    {type === "Videos" && <FileVideo className="w-4 h-4" />}
                    {type}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Gallery Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredItems.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  {item.type === "image" ? (
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={item.src} 
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 bg-black/70 text-white px-3 py-1 text-sm flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.date}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center mb-8">
            <p className="text-muted-foreground">No gallery items found matching your filters.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedYear("All");
                setSelectedType("All");
              }}
              className="mt-2"
            >
              Reset Filters
            </Button>
          </Card>
        )}
        
        {/* Featured Carousel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Featured Updates</CardTitle>
            <CardDescription>Key moments from the project journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full">
              <CarouselContent>
                {galleryItems.map(item => (
                  <CarouselItem key={item.id}>
                    <div className="p-1">
                      <div className="aspect-video overflow-hidden rounded-lg">
                        {item.type === "image" ? (
                          <img 
                            src={item.src} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video 
                            src={item.src} 
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="mt-3 text-center">
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2" />
              <CarouselNext className="absolute right-2" />
            </Carousel>
          </CardContent>
        </Card>
      </main>
      
      <footer className="py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 Hijibiji Flat Insight • A community initiative by flat owners
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
