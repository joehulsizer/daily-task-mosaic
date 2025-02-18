
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "lucide-react";
import { useState } from "react";

interface AddCourseDialogProps {
  onAddCourse: (name: string) => void;
}

export const AddCourseDialog = ({ onAddCourse }: AddCourseDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [courseName, setCourseName] = useState("");

  const handleSubmit = () => {
    onAddCourse(courseName);
    setCourseName("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Add Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
