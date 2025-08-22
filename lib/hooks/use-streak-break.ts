import { useStreakBreakContext } from "@/lib/context/streak-break-context";

export function useStreakBreakRestart() {
  const context = useStreakBreakContext();
  
  return {
    flowBranch: context.restartFlowBranch,
    completedTasks: [], 
    handleContinueCurrentChallenge: context.handleContinueCurrentChallenge,
    handleAddCustomTask: context.handleAddCustomTask,
    handleRemoveCustomTask: context.handleRemoveCustomTask,
    handleUpdateCustomChallenge: context.updateChallengeSelection,
    goToCustom: context.goToCustom,
    goToChoose: context.goToChoose,
  };
}