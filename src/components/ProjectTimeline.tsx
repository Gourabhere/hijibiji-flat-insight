
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const timelineData = [
  {
    date: "2017",
    title: "Project Started",
    description: "Initial payments made by buyers",
    status: "completed",
  },
  {
    date: "2020",
    title: "Original Handover Date",
    description: "First promised completion date",
    status: "completed",
  },
  {
    date: "2022",
    title: "First Extension",
    description: "Handover postponed by builders",
    status: "completed",
  },
  {
    date: "2024",
    title: "Second Extension",
    description: "Further delays announced",
    status: "current",
  },
  {
    date: "2025 Sep",
    title: "Latest Promised Date",
    description: "Current expected handover timeline",
    status: "future",
  },
];

const TimelineItem = ({ item }: { item: typeof timelineData[0] }) => {
  const dotClass = 
    item.status === "completed" 
      ? "timeline-dot timeline-dot-completed" 
      : item.status === "current" 
        ? "timeline-dot timeline-dot-current"
        : "timeline-dot timeline-dot-future";
  
  return (
    <div className="timeline-item pl-10">
      <div className={dotClass}></div>
      <div className="font-medium">{item.date}</div>
      <div className="font-semibold">{item.title}</div>
      <div className="text-sm text-muted-foreground">{item.description}</div>
    </div>
  );
};

const ProjectTimeline = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>Key milestones and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {timelineData.map((item, index) => (
            <TimelineItem key={index} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimeline;
