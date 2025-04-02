
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const progressItems = [
  { name: "Structure", percentage: 95 },
  { name: "Plumbing", percentage: 75 },
  { name: "Electrical", percentage: 70 },
  { name: "Flooring", percentage: 50 },
  { name: "Painting", percentage: 30 },
  { name: "Finishing", percentage: 20 },
];

const ProgressTracker = () => {
  // Calculate overall progress
  const overallProgress = Math.round(
    progressItems.reduce((sum, item) => sum + item.percentage, 0) / progressItems.length
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Construction Progress</CardTitle>
        <CardDescription>Current status of different construction areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>
        
        <div className="space-y-4">
          {progressItems.map((item, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
              </div>
              <Progress value={item.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
