"use client";

import { useEffect, useState } from "react";
import { Sparkles, BookOpenCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CompletedChallenge = () => {
  const [hasEnrolledNextChallenge, setHasEnrolledNextChallenge] =
    useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nextChallengeDate");
    if (!stored) return;

    try {
      const { date } = JSON.parse(stored);
      const storedDate = new Date(date);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      setHasEnrolledNextChallenge(
        storedDate.toDateString() === tomorrow.toDateString()
      );
    } catch (err) {
      console.error("Invalid stored date:", err);
    }
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#282828] to-[#1d2021] border border-[#3c3836] shadow-md mb-8">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <radialGradient id="celebrate" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor="#fe8019" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1d2021" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#celebrate)" />
        </svg>
      </div>

      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#3c3836] p-3 rounded-full">
            {hasEnrolledNextChallenge ? (
              <Clock className="text-[#fe8019] w-6 h-6" />
            ) : (
              <Sparkles className="text-[#fe8019] w-6 h-6" />
            )}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#ebdbb2]">
              {hasEnrolledNextChallenge
                ? "Starting Tomorrow!"
                : "Challenge Completed!"}
            </h1>
            <p className="text-sm sm:text-base text-[#a89984] mt-1">
              {hasEnrolledNextChallenge ? (
                <>Your new challenge will start tomorrow.</>
              ) : (
                "Congratulations! You've successfully completed this challenge."
              )}
            </p>
          </div>
        </div>

        {!hasEnrolledNextChallenge && (
          <div className="sm:ml-auto">
            <Link href={"/complete-challenge"}>
              <Button className="bg-[#fe8019]/90 hover:bg-[#fe8019] text-[#1d2021] font-semibold px-5 py-2 rounded-md transition">
                View Summary
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedChallenge;
