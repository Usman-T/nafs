"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dimension } from "@prisma/client";
import CustomTaskForm from "@/components/custom/onboarding/onboarding-task-form";
import { TaskListItem } from "@/components/custom/onboarding/task-list-item";

interface CustomTask {
  name: string;
  dimension: Dimension;
}

interface CustomChallengeState {
  title: string;
  description: string;
  duration: number;
  tasks: CustomTask[];
}

export const CustomTasksStep = ({
  customChallenge,
  onAddTask,
  onRemoveTask,
  showTaskForm,
  setShowTaskForm,
  isActive,
  dimensions,
}: {
  customChallenge: CustomChallengeState;
  onAddTask: (task: { name: string; dimension: Dimension }) => void;
  onRemoveTask: (index: number) => void;
  showTaskForm: boolean;
  setShowTaskForm: (show: boolean) => void;
  isActive: boolean;
  dimensions: Dimension[];
}) => (
  <>
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
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
                {customChallenge.tasks.map((task, i) => (
                  <TaskListItem
                    key={i}
                    task={task}
                    index={i}
                    onRemove={onRemoveTask}
                  />
                ))}
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
            </AnimatePresence>
          </div>
          <div className="text-sm text-[#a89984] text-center">
            <p>Add at least 3 and at max 5 do-able tasks to your challenge.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <CustomTaskForm
      onAdd={onAddTask}
      dimensions={dimensions}
      onCancel={() => setShowTaskForm(false)}
      isOpen={showTaskForm}
      setIsOpen={setShowTaskForm}
    />
  </>
);
