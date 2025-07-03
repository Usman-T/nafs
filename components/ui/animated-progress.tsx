"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import React from "react";

export default function AnimatedProgress({
  value,
  background,
  foreground,
}: {
  value: number;
  background: string; // e.g. "#fe8019"
  foreground: string; // e.g. "#fabd2f"
}) {
  return (
    <div className="w-full relative">
      <style>{`
        @keyframes shimmer {
          0% { left: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: ${value}%; opacity: 0; }
        }
        .shimmer {
          animation: shimmer 1.2s infinite ease-in-out;
        }
      `}</style>

      <ProgressPrimitive.Root className="relative h-2 w-full overflow-hidden rounded-full bg-[#1d2021]">
        <ProgressPrimitive.Indicator
          className="h-full transition-all rounded-full relative"
          style={{
            width: `${value}%`,
            backgroundColor: background,
          }}
        >
          <div
            className="absolute top-0 h-full w-6 shimmer blur-[6px]"
            style={{
              backgroundColor: foreground,
            }}
          />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  );
}