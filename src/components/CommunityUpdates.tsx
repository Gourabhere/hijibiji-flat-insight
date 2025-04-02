
import { MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const updates = [
  {
    author: "Rahul M.",
    avatar: "RM",
    message: "Site visit update: They've started work on the parking area, but still very slow progress.",
    time: "2 hours ago",
    replies: 5,
  },
  {
    author: "Priya S.",
    avatar: "PS",
    message: "Called the builder's office today. They claim material shortage is causing delays.",
    time: "Yesterday",
    replies: 12,
  },
  {
    author: "Vivek T.",
    avatar: "VT",
    message: "Shared some photos from today's visit in the WhatsApp group.",
    time: "2 days ago",
    replies: 8,
  },
];

const CommunityUpdates = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Updates</CardTitle>
        <CardDescription>Recent discussions and site reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex gap-3">
                <Avatar>
                  <div className="flex items-center justify-center w-full h-full font-medium bg-primary text-primary-foreground">
                    {update.avatar}
                  </div>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{update.author}</p>
                    <p className="text-xs text-muted-foreground">{update.time}</p>
                  </div>
                  <p>{update.message}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{update.replies} replies</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" className="flex gap-2">
            <Users className="w-4 h-4" />
            <span>View All Updates</span>
          </Button>
          <Button className="flex gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>Post Update</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityUpdates;
