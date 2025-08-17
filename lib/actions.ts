// auth stuff
export {
  createUser,
  login,
  type loginState,
  type State,
} from "@/lib/actions/auth";

// challenge management
export { completeChallenge } from "@/lib/actions/complete-challenge";
export { startChallenge } from "@/lib/actions/manage-challenge";

// task completion system
export { completeTask } from "@/lib/actions/complete-task";

// streak management functions
export {
  checkUserStreak,
  completeDayAndUpdateStreak,
} from "@/lib/actions/manage-streak";

// streak break management
export { resetTasks, dimensionsReset } from "@/lib/actions/streak-break";