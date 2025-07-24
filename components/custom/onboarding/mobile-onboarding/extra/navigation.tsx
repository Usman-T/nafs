import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";

const Navigation = ({
  steps,
  currentStep,
}: {
  steps: any[];
  currentStep: number;
}) => {
  return (
    <div className="flex justify-center items-center  pt-4">
      <div className="flex space-x-2">
        {steps.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === currentStep ? "bg-[#fe8019] scale-125" : "bg-[#3c3836]"
            )}
            whileHover={{ scale: 1.3 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
