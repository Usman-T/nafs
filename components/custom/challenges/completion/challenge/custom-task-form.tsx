import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CustomTaskForm = ({
  onAdd,
  onCancel,
}: {
  onAdd: (task: { name: string; dimension: string }) => void;
  onCancel: () => void;
}) => {
  const [taskName, setTaskName] = useState("");
  const [dimension, setDimension] = useState("Salah");

  const dimensions = [
    "Salah",
    "Quran",
    "Charity",
    "Community",
    "Dhikr",
    "Knowledge",
    "Character",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 overflow-hidden"
    >
      <div className="space-y-2">
        <label className="text-sm text-[#a89984]">Task Name</label>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] focus:border-[#fe8019] focus:ring-[#fe8019]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-[#a89984]">Dimension</label>
        <div className="flex flex-wrap gap-2">
          {dimensions.map((dim) => (
            <Badge
              key={dim}
              className={cn(
                "cursor-pointer transition-all",
                dimension === dim
                  ? "bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
                  : "bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945]"
              )}
              onClick={() => setDimension(dim)}
            >
              {dim}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          className="flex-1 border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
          onClick={() => {
            if (taskName.trim()) {
              onAdd({ name: taskName, dimension });
              setTaskName("");
            }
          }}
          disabled={!taskName.trim()}
        >
          Add Task
        </Button>
      </div>
    </motion.div>
  );
};

export default CustomTaskForm;
