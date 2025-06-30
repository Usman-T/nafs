import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Dimension } from "@prisma/client";
import CustomTaskForm from "@/components/custom/onboarding/onboarding-task-form";
import { iconMap } from "@/lib/iconMap";

interface CustomChallengeStepProps {
  customChallenge: {
    tasks: { name: string; dimension: Dimension }[];
  };
  dimensions: Dimension[];
  onAddTask: (task: { name: string; dimension: Dimension }) => void;
  onRemoveTask: (index: number) => void;
}

export const CustomChallengeStep: React.FC<CustomChallengeStepProps> = ({
  customChallenge,
  dimensions,
  onAddTask,
  onRemoveTask,
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleAddTask = (task: { name: string; dimension: Dimension }) => {
    onAddTask(task);
    setShowTaskForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">
          Add Challenge Tasks
        </h2>
        <p className="text-[#a89984]">
          Create tasks to complete daily during your challenge
        </p>
      </div>

      <div className="space-y-4">
        {customChallenge.tasks.length > 0 ? (
          <div className="space-y-2">
            {customChallenge.tasks.map((task, i) => {
              const IconComponent = iconMap[task.dimension.icon] || "BookOpen";
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-md bg-[#1d2021] border border-[#3c3836]"
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-[#a89984] hover:text-[#fb4934] hover:bg-transparent flex-shrink-0"
                    onClick={() => onRemoveTask(i)}
                  >
                    <Trash className="w-6 h-6" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-[#3c3836] rounded-md">
            <p className="text-[#a89984]">No tasks added yet</p>
            <p className="text-xs text-[#a89984] mt-1">
              Add tasks to complete during your challenge
            </p>
          </div>
        )}

        <AnimatePresence>
          {showTaskForm ? (
            <CustomTaskForm
              onAdd={handleAddTask}
              dimensions={dimensions}
              onCancel={() => setShowTaskForm(false)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="outline"
                className="w-full border-dashed border-[#3c3836] text-[#a89984] hover:text-[#fe8019] hover:border-[#fe8019] hover:bg-transparent"
                onClick={() => setShowTaskForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Task
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-sm text-[#a89984] text-center">
        <p>Add at least 3 and at max 5 do-able tasks to your challenge.</p>
      </div>
    </motion.div>
  );
};
