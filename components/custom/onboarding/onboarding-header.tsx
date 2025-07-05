import { Award } from "lucide-react";

export const OnboardingHeader = ({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) => (
  <div className="p-4 border-b border-[#3c3836] flex items-center justify-between">
    <div className="flex items-center">
      <Award className="h-5 w-5 text-[#fe8019] mr-2" />
      <span className="text-[#ebdbb2] font-medium">
        Challenge Onboarding
      </span>
    </div>
    <div className="text-[#a89984] text-sm">
      Step {step + 1} of {totalSteps}
    </div>
  </div>
);