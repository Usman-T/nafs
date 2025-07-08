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
    setIsCompletingDay(true);

    try {
      const result = await completeDayAndUpdateStreak();
      console.log(result);

      if (result.success) {
        setShowCompletionFlow(false);
        setDayCompleted({
          date: new Date().toDateString(),
          completed: true,
        });
        localStorage.removeItem("nafs-hide-mobile-nav");
        window.dispatchEvent(new Event("storage"));
        router.refresh();
      } else {
        console.error("Failed to complete day:", result.message);
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
