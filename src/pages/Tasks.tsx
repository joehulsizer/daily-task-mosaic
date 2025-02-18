
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";

const Tasks = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground mt-2">Manage your general tasks and to-dos</p>
          </div>
          <Button>
            <CheckSquare className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Tasks;
