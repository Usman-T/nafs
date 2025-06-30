import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { isSameDay } from "date-fns";
import {
  DailyTask,
  Task,
  Dimension,
  CompletedTask,
  User,
  UserChallenge,
} from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type TaskWithRelations = DailyTask & {
  task: Task & {
    dimension: Dimension;
  };
  completions: CompletedTask[];
  user: User & { currentChallenge: UserChallenge };
};

export const getTasksForDate = (tasks: TaskWithRelations[], date: Date) => {
  return tasks.filter(
    (task) => task.date.toDateString() === date.toDateString()
  );
};

export const getCompletedTasksForDate = (
  tasks: TaskWithRelations[],
  date: Date
) => {
  return tasks.filter((task) =>
    task.completions.some((c) => isSameDay(new Date(c.completedAt), date))
  );
};

export const getCompletionPercentage = (
  tasks: TaskWithRelations[],
  date: Date
) => {
  const dateTasks = getTasksForDate(tasks, date);
  const completedTasks = getCompletedTasksForDate(tasks, date);
  return dateTasks.length > 0
    ? (completedTasks.length / dateTasks.length) * 100
    : 0;
};

export const areAllTasksCompleted = (
  tasks: TaskWithRelations[],
  date: Date
) => {
  const dateTasks = getTasksForDate(tasks, date);
  return (
    dateTasks.length > 0 &&
    dateTasks.every((task) => task.completions.length > 0)
  );
};
