
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Course, Task } from "@/types/school";
import { AddCourseDialog } from "@/components/school/AddCourseDialog";
import { AddTaskDialog } from "@/components/school/AddTaskDialog";
import { TaskList } from "@/components/school/TaskList";

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

  const handleAddCourse = (name: string) => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a course name",
        variant: "destructive",
      });
      return;
    }

    const newCourse: Course = {
      id: `course${Date.now()}`,
      name,
      tasks: [],
    };

    setCourses([...courses, newCourse]);
    toast({
      title: "Success",
      description: "Course added successfully",
    });
  };

  const handleAddTask = (courseId: string, title: string, type: "todo" | "due", dueDate?: string) => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const newTask: Task = {
          id: `task${Date.now()}`,
          title,
          type,
          completed: false,
          ...(type === "due" && dueDate ? { dueDate } : {}),
        };

        return {
          ...course,
          tasks: [...course.tasks, newTask],
        };
      }
      return course;
    }));

    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

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
          <AddCourseDialog onAddCourse={handleAddCourse} />
        </header>

        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>{course.name}</CardTitle>
                <AddTaskDialog 
                  onAddTask={(title, type, dueDate) => 
                    handleAddTask(course.id, title, type, dueDate)
                  } 
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TaskList
                    title="To Do"
                    tasks={course.tasks.filter(task => task.type === "todo")}
                    onToggleTask={(taskId) => toggleTaskCompletion(course.id, taskId)}
                    onDeleteTask={(taskId) => deleteTask(course.id, taskId)}
                  />
                  <TaskList
                    title="Due"
                    tasks={course.tasks.filter(task => task.type === "due")}
                    onToggleTask={(taskId) => toggleTaskCompletion(course.id, taskId)}
                    onDeleteTask={(taskId) => deleteTask(course.id, taskId)}
                  />
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
