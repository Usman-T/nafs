import { RotateCcw } from "lucide-react";

const StreakBreakHeader = ({ step }: { step: number }) => {
  return (
    <div className="flex items-center justify-between w-full p-6">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fe8019] rounded-full flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-[#1d2021]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#ebdbb2]">
                Streak Broken
              </h1>
              <p className="text-sm text-[#a89984]">Step {step + 1} of 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakBreakHeader;
