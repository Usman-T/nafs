"use client";

import { Challenge, Task as TaskType } from "@prisma/client";
import Task from "@/components/custom/onboarding/onboarding-task";
import { Dispatch, SetStateAction } from "react";

const TaskSelection = ({
  selectedChallenge,
  selectedTasks,
  setSelectedTasks,
}: {
  selectedChallenge: Challenge & { tasks: TaskType[] };
  selectedTasks: number[];
  setSelectedTasks: Dispatch<SetStateAction<number[]>>;
}) => {
  const toggleTaskSelection = (taskIndex: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskIndex)
        ? prev.filter((index) => index !== taskIndex)
        : [...prev, taskIndex]
    );
  };

  return (
    <>
      {selectedChallenge.tasks.map((task, i) => (
        <Task
          key={i}
          task={task}
          isSelected={selectedTasks.includes(i)}
          onClick={() => toggleTaskSelection(i)}
        />
      ))}
    </>
  );
};

export default TaskSelection;
