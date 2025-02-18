
import { CheckCircle, Clock, X } from "lucide-react";
import { Task } from "@/types/school";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-school-light hover:bg-school-light/80 transition-colors">
      <button
        onClick={onToggle}
        className="text-school-dark hover:text-school-DEFAULT transition-colors"
      >
        <CheckCircle className={`h-5 w-5 ${task.completed ? "fill-school-DEFAULT" : ""}`} />
      </button>
      <span className={task.completed ? "line-through text-muted-foreground" : ""}>
        {task.title}
      </span>
      {task.type === "due" && task.dueDate && (
        <span className="ml-auto flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      )}
      <button
        onClick={onDelete}
        className={`${task.type === "due" ? "ml-2" : "ml-auto"} text-muted-foreground hover:text-destructive transition-colors`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
