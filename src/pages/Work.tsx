
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, CheckCircle, Clock, Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  completed: boolean;
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

const Work = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj1",
      name: "Website Redesign",
      tasks: [
        {
          id: "task1",
          title: "Design Review",
          priority: "high",
          dueDate: "2024-02-25",
          completed: false,
        },
      ],
    },
  ]);

  const [newProjectName, setNewProjectName] = useState("");
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    const newProject: Project = {
      id: `proj${Date.now()}`,
      name: newProjectName,
      tasks: [],
    };

    setProjects([...projects, newProject]);
    setNewProjectName("");
    setIsNewProjectDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Project added successfully",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Work</h1>
            <p className="text-muted-foreground mt-2">Manage your work projects and tasks</p>
          </div>
          <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Briefcase className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="Enter project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleAddProject}>
                  Add Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover-scale">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Project tasks will go here */}
                <div className="text-muted-foreground">Coming soon...</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Work;
