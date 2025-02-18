
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, Briefcase, ShoppingBag, CheckSquare } from "lucide-react";

const DailySummary = () => {
  // Mock data for demonstration
  const todayTasks = [
    { id: 1, title: "Watch AM120 Lecture", category: "school" },
    { id: 2, title: "Submit weekly report", category: "work" },
    { id: 3, title: "Buy groceries", category: "shopping" },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">Good morning</h1>
        <p className="text-muted-foreground mt-2">Here's what you should be doing today</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today's Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                >
                  {task.category === "school" && <Book className="w-5 h-5 text-school-dark" />}
                  {task.category === "work" && <Briefcase className="w-5 h-5 text-work-dark" />}
                  {task.category === "shopping" && <ShoppingBag className="w-5 h-5 text-shopping-dark" />}
                  <span>{task.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-school-DEFAULT" />
              School
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              2 upcoming assignments
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-work-DEFAULT" />
              Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              3 tasks for today
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-shopping-DEFAULT" />
              Shopping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              5 items on your list
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AppLayout>
      <DailySummary />
    </AppLayout>
  );
};

export default Index;
