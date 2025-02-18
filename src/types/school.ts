
export interface Task {
  id: string;
  title: string;
  type: "todo" | "due";
  dueDate?: string;
  completed: boolean;
}

export interface Course {
  id: string;
  name: string;
  tasks: Task[];
}
