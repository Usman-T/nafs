import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { completeDayAndUpdateStreak } from "@/lib/actions";

export const useChallenges = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionFlow, setShowCompletionFlow] = useState(false);
  const [isCompletingDay, setIsCompletingDay] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayCompleted, setDayCompleted] = useLocalStorage<{
    date: string;
    completed: boolean;
  }>("dayCompleted", { date: "", completed: false });

const handleCompletionFlowFinished = async () => {
  if (isCompletingDay) {
    console.log("Already completing day, ignoring duplicate call");
    return;
  }
  
  setIsCompletingDay(true);
  try {
    console.log("Starting day completion...");
    const result = await completeDayAndUpdateStreak();
    console.log("Day completion result:", result);
    
    if (result.success) {
      console.log("Day completed successfully, new streak:", result.newStreak);
      setShowCompletionFlow(false);
      setDayCompleted({
        date: new Date().toDateString(),
        completed: true,
      });
      localStorage.removeItem("nafs-hide-mobile-nav");
      window.dispatchEvent(new Event("storage"));
      
      window.location.reload();
    } else {
      console.error("Failed to complete day:", result.message, result.error);
      setShowCompletionFlow(false);
      localStorage.removeItem("nafs-hide-mobile-nav");
    }
  } catch (error) {
    console.error("Error completing day:", error);
    setShowCompletionFlow(false);
    localStorage.removeItem("nafs-hide-mobile-nav");
    window.dispatchEvent(new Event("storage"));
  } finally {
    setIsCompletingDay(false);
  }
};

  const isTodayCompleted = () => {
    if (!dayCompleted?.date) return false;
    const todayStr = new Date().toDateString();
    return dayCompleted.date === todayStr && dayCompleted.completed;
  };

  const handleShowCompletionFlow = () => {
    setShowCompletionFlow(true);
    localStorage.setItem("nafs-hide-mobile-nav", "true");
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return {
    isMounted,
    isLoading,
    showCompletionFlow,
    isCompletingDay,
    selectedDate,
    setSelectedDate,
    dayCompleted,
    handleCompletionFlowFinished,
    isTodayCompleted,
    handleShowCompletionFlow,
  };
};
