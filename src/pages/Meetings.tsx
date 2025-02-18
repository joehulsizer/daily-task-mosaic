
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Meetings = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Meetings</h1>
            <p className="text-muted-foreground mt-2">Manage your meetings and attendees</p>
          </div>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Meetings;
