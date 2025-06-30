import { Dimension, DimensionValue } from "@prisma/client";

interface DimensionValueWithDimension extends DimensionValue {
  dimension: Dimension;
}

interface DailyTaskWithDetails {
  task: { dimensionId: string; name: string };
  completions: any[];
}

export const calculateDimensionProgress = (
  dimensions: Dimension[],
  dimensionValues: DimensionValueWithDimension[],
  dailyTasks: DailyTaskWithDetails[]
) => {
  const currentValues: Record<string, number> = {};
  const previousValues: Record<string, number> = {};

  // Initialize current values
  dimensionValues.forEach((dimensionValue) => {
    currentValues[dimensionValue.dimension.id] = dimensionValue.value * 100;
  });

  dimensions.forEach((dim) => {
    if (!(dim.id in currentValues)) {
      currentValues[dim.id] = 0;
    }
  });

  // Calculate impacts
  const dimensionTaskImpacts: Record<
    string,
    { totalCompletions: number; tasks: string[] }
  > = {};

  dimensions.forEach((dim) => {
    dimensionTaskImpacts[dim.id] = { totalCompletions: 0, tasks: [] };
  });

  dailyTasks.forEach((dailyTask) => {
    const dimensionId = dailyTask.task.dimensionId;
    const completionsCount = dailyTask.completions.length;

    if (dimensionTaskImpacts[dimensionId] && completionsCount > 0) {
      dimensionTaskImpacts[dimensionId].totalCompletions += completionsCount;
      if (
        !dimensionTaskImpacts[dimensionId].tasks.includes(dailyTask.task.name)
      ) {
        dimensionTaskImpacts[dimensionId].tasks.push(dailyTask.task.name);
      }
    }
  });

  // Calculate dimension impacts
  const dimensionImpacts: Record<string, { value: number; tasks: string[] }> =
    {};
  const impactPerCompletion = 3;

  dimensions.forEach((dim) => {
    const dimensionId = dim.id;
    const currentValue = currentValues[dimensionId] || 0;
    const taskImpactData = dimensionTaskImpacts[dimensionId];
    const totalImpact = taskImpactData.totalCompletions * impactPerCompletion;

    previousValues[dimensionId] = Math.max(0, currentValue - totalImpact);
    dimensionImpacts[dimensionId] = {
      value: currentValue,
      tasks: taskImpactData.tasks,
    };
  });

  const totalCompletions = Object.values(dimensionTaskImpacts).reduce(
    (sum, impact) => sum + impact.totalCompletions,
    0
  );

  if (totalCompletions === 0) {
    dimensions.forEach((dim) => {
      const dimensionId = dim.id;
      const currentValue = currentValues[dimensionId] || 0;
      previousValues[dimensionId] = Math.max(0, currentValue - 2);
    });
  }

  return { previousValues, currentValues, dimensionImpacts };
};
