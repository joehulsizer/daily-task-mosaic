
import { Task } from "@/types/school";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList = ({ title, tasks, onToggleTask, onDeleteTask }: TaskListProps) => {
  return (
    <div>
      <h3 className="font-semibold text-sm text-muted-foreground mb-2">{title}</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};
