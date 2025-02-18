
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddTaskDialogProps {
  onAddTask: (title: string, type: "todo" | "due", dueDate?: string) => void;
}

export const AddTaskDialog = ({ onAddTask }: AddTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskType, setTaskType] = useState<"todo" | "due">("todo");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    onAddTask(taskTitle, taskType, taskType === "due" ? dueDate : undefined);
    setTaskTitle("");
    setTaskType("todo");
    setDueDate("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-school-dark hover:text-school-DEFAULT hover:border-school-DEFAULT"
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
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taskType">Task Type</Label>
            <select
              id="taskType"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as "todo" | "due")}
            >
              <option value="todo">To Do</option>
              <option value="due">Due</option>
            </select>
          </div>
          {taskType === "due" && (
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          )}
          <Button className="w-full" onClick={handleSubmit}>
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
