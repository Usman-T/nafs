"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { iconMap } from "@/lib/iconMap";
import { Dimension } from "@prisma/client";

interface CustomTask {
  name: string;
  dimension: Dimension;
}

export const TaskListItem = ({
  task,
  index,
  onRemove,
}: {
  task: CustomTask;
  index: number;
  onRemove: (index: number) => void;
}) => {
  const IconComponent = iconMap[task.dimension.icon] || "BookOpen";

  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]">
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
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 text-[#a89984] hover:text-[#fb4934] hover:bg-transparent flex-shrink-0"
        onClick={() => onRemove(index)}
      >
        <Trash className="w-6 h-6" />
      </Button>
    </div>
  );
};
