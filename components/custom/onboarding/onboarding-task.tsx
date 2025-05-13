import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconMap } from "@/lib/iconMap";
import { Dimension, Task as TaskType } from "@prisma/client";

const Task = ({
  task,
  isSelected = false,
  onClick,
}: {
  task: TaskType & { dimension: Dimension };
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const IconComponent = iconMap[task.dimension.icon] || "BookOpen";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "flex items-center justify-between p-3 rounded-md border transition-all duration-200 cursor-pointer",
        isSelected
          ? "bg-[#1d2021] border-[#fe8019]"
          : "bg-[#1d2021] border-[#3c3836] hover:border-[#504945]"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <IconComponent
            className="h-4 w-4"
            style={{
              color: task.dimension.color,
              borderColor: task.dimension.color,
            }}
          />
        </div>
        <div>
          <span className="text-[#ebdbb2] text-sm sm:text-base">
            {task.name}
          </span>
          <div className="text-xs text-[#a89984] mt-1">
            {task.dimension.name}
          </div>
        </div>
      </div>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-6 w-6 rounded-full bg-[#fe8019] flex items-center justify-center flex-shrink-0"
        >
          <Check className="h-3 w-3 text-[#1d2021]" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Task;
