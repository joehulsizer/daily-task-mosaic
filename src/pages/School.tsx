
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, CheckCircle, Clock, Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
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

  const [newCourseName, setNewCourseName] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState<"todo" | "due">("todo");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isNewCourseDialogOpen, setIsNewCourseDialogOpen] = useState(false);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

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

  const handleAddCourse = () => {
    if (!newCourseName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a course name",
        variant: "destructive",
      });
      return;
    }

    const newCourse: Course = {
      id: `course${Date.now()}`,
      name: newCourseName,
      tasks: [],
    };

    setCourses([...courses, newCourse]);
    setNewCourseName("");
    setIsNewCourseDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Course added successfully",
    });
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !selectedCourseId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setCourses(courses.map(course => {
      if (course.id === selectedCourseId) {
        const newTask: Task = {
          id: `task${Date.now()}`,
          title: newTaskTitle,
          type: newTaskType,
          completed: false,
          ...(newTaskType === "due" && newTaskDueDate ? { dueDate: newTaskDueDate } : {}),
        };

        return {
          ...course,
          tasks: [...course.tasks, newTask],
        };
      }
      return course;
    }));

    setNewTaskTitle("");
    setNewTaskType("todo");
    setNewTaskDueDate("");
    setIsNewTaskDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const deleteTask = (courseId: string, taskId: string) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          tasks: course.tasks.filter(task => task.id !== taskId),
        };
      }
      return course;
    }));

    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fadeIn">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">School</h1>
            <p className="text-muted-foreground mt-2">Manage your courses and assignments</p>
          </div>
          <Dialog open={isNewCourseDialogOpen} onOpenChange={setIsNewCourseDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-school-DEFAULT hover:bg-school-dark">
                <Book className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input
                    id="courseName"
                    placeholder="Enter course name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleAddCourse}>
                  Add Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{course.name}</CardTitle>
                <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-school-dark hover:text-school-DEFAULT hover:border-school-DEFAULT"
                      onClick={() => setSelectedCourseId(course.id)}
                    >
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="taskTitle">Task Title</Label>
                        <Input
                          id="taskTitle"
                          placeholder="Enter task title"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taskType">Task Type</Label>
                        <select
                          id="taskType"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          value={newTaskType}
                          onChange={(e) => setNewTaskType(e.target.value as "todo" | "due")}
                        >
                          <option value="todo">To Do</option>
                          <option value="due">Due</option>
                        </select>
                      </div>
                      {newTaskType === "due" && (
                        <div className="space-y-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={newTaskDueDate}
                            onChange={(e) => setNewTaskDueDate(e.target.value)}
                          />
                        </div>
                      )}
                      <Button className="w-full" onClick={handleAddTask}>
                        Add Task
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
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
                            <button
                              onClick={() => deleteTask(course.id, task.id)}
                              className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
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
                            <button
                              onClick={() => deleteTask(course.id, task.id)}
                              className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
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
