
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  type: "todo" | "due";
  dueDate?: string;
  completed: boolean;
}

interface Course {
  id: string;
  name: string;
  tasks: Task[];
}

const School = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "am120",
      name: "AM120 - Applied Mathematics",
      tasks: [
        {
          id: "task1",
          title: "Watch Lecture 1",
          type: "todo",
          completed: false,
        },
        {
          id: "task2",
          title: "Problem Set 1",
          type: "due",
          dueDate: "2024-02-20",
          completed: false,
        },
      ],
    },
  ]);

  const toggleTaskCompletion = (courseId: string, taskId: string) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          tasks: course.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }
      return course;
    }));
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">School</h1>
            <p className="text-muted-foreground mt-2">Manage your courses and assignments</p>
          </div>
          <Button className="bg-school-DEFAULT hover:bg-school-dark">
            <Book className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </header>

        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover-scale">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">To Do</h3>
                    <div className="space-y-2">
                      {course.tasks
                        .filter((task) => task.type === "todo")
                        .map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-school-light hover:bg-school-light/80 transition-colors"
                          >
                            <button
                              onClick={() => toggleTaskCompletion(course.id, task.id)}
                              className="text-school-dark hover:text-school-DEFAULT transition-colors"
                            >
                              <CheckCircle className={`h-5 w-5 ${task.completed ? "fill-school-DEFAULT" : ""}`} />
                            </button>
                            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                              {task.title}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">Due</h3>
                    <div className="space-y-2">
                      {course.tasks
                        .filter((task) => task.type === "due")
                        .map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-school-light hover:bg-school-light/80 transition-colors"
                          >
                            <button
                              onClick={() => toggleTaskCompletion(course.id, task.id)}
                              className="text-school-dark hover:text-school-DEFAULT transition-colors"
                            >
                              <CheckCircle className={`h-5 w-5 ${task.completed ? "fill-school-DEFAULT" : ""}`} />
                            </button>
                            <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                              {task.title}
                            </span>
                            {task.dueDate && (
                              <span className="ml-auto flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default School;
