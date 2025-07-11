import { Challenge as ChallengeSchema, Dimension, Task } from "@prisma/client";
import StartNewChallenge from "./start-new";
import ChoosePredefinedBranch from "./choose-existing";
import SelectedChallenge from "@/components/custom/onboarding/onboarding-selected-challenge";
import CustomTaskForm from "@/components/custom/onboarding/onboarding-task-form";

type Challenge = ChallengeSchema & {
  tasks: {
    task: Task & {
      dimension: Dimension;
    };
  }[];
};

interface Props {
  currentChallenge: Challenge;
  selectedChallenge: ChallengeSchema | null;
  setSelectedChallenge: (challengeId: string | null) => void;
  predefinedChallenges: Challenge[];
  duration: number;
  handleNext: () => void;
  flowBranchType: "CHOOSE_BRANCH" | "PREDEFINED" | "CUSTOM" | "SELECT_TASKS";
  setFlowBranchType: (
    type: "CHOOSE_BRANCH" | "PREDEFINED" | "CUSTOM" | "SELECT_TASKS"
  ) => void;
  dimensions: Dimension[];
  onAdd: () => void;
  onCancel: (
    name: string,
    dimension: Dimension
  ) => { name: string; dimension: Dimension };
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedTasks: Task[];
  setSelectedTasks: (tasks: Task[]) => void;
  challengeLoading: boolean;
}

const StreakBreakRestart = ({
  currentChallenge,
  selectedChallenge,
  setSelectedChallenge,
  predefinedChallenges,
  duration,
  handleNext,
  flowBranchType,
  setFlowBranchType,
  dimensions,
  onAdd,
  onCancel,
  isOpen,
  setIsOpen,
  selectedTasks,
  setSelectedTasks,
  challengeLoading,
}: Props) => {
  const completedTasks = currentChallenge.tasks.filter((t) => t.task);

  switch (flowBranchType) {
    case "PREDEFINED":
      return (
        <ChoosePredefinedBranch
          predefinedChallenges={predefinedChallenges}
          onCreateCustom={() => setFlowBranchType("CUSTOM")}
          duration={duration}
          selectedChallengeId={selectedChallenge?.id}
          onSelectChallenge={setSelectedChallenge}
        />
      );
    case "CUSTOM":
      return (
        <CustomTaskForm
          dimensions={dimensions}
          onAdd={onAdd}
          onCancel={onCancel}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      );
    case "SELECT_TASKS":
      return (
        <SelectedChallenge
          selectedTasks={selectedTasks}
          setSelectedTasks={setSelectedTasks}
          challenge={selectedChallenge}
          loading={challengeLoading}
        />
      );
    case "CHOOSE_BRANCH":
    default:
      return (
        <StartNewChallenge
          currentChallenge={currentChallenge}
          setFlowBranchType={setFlowBranchType}
          handleNext={handleNext}
          setSelectedChallenge={setSelectedChallenge}
          completedTasks={completedTasks}
        />
      );
  }
};

export default StreakBreakRestart;
