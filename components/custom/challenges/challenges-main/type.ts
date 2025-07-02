import {
  Challenge,
  CompletedTask,
  DailyTask,
  DimensionValue,
  Task,
  UserChallenge,
  Dimension,
  User,
} from "@prisma/client";

export interface ChallengesProps {
  challenge: UserChallenge & {
    challenge: Challenge &
      {
        tasks: {
          task: Task & {
            dimension: Dimension;
          };
        };
      }[];
  };
  tasks: (DailyTask & {
    task: Task & {
      dimension: Dimension;
    };
    completions: CompletedTask[];
    user: User & { currentChallenge: UserChallenge };
  })[];
  dimensionValues: DimensionValue[];
  dimensions: Dimension[];
  hasCompletedChallenge: boolean;
}
