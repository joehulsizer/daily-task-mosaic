
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban } from "lucide-react";

const Projects = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-2">Manage your projects and collaborations</p>
          </div>
          <Button>
            <FolderKanban className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">Coming soon...</div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Projects;
