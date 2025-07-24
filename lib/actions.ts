"use server"

// auth stuff
export {
  createUser,
  login,
  type loginState,
  type State,
} from "@/lib/actions/auth";

// challenge management
export { completeChallenge } from "@/lib/actions/complete-challenge";
export {
  enrollInExistingChallenge,
  createCustomChallenge,
} from "@/lib/actions/manage-challenge";

// task and day system
export { completeTask } from "@/lib/actions/complete-task";
export { initializeDayTasks } from "@/lib/actions/init-day-tasks";
export { createExtraTask } from "@/lib/actions/add-extra-task";

// helper streak functions
export {
  checkUserStreak,
  updateUserStreak,
  completeDayAndUpdateStreak,
} from "@/lib/actions/manage-streak";


export { 
  resetTasks, 
  dimensionsReset
} from "@/lib/actions/streak-break"
