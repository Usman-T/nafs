import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Particle from "./day/particle";
import { Dimension, Task } from "@prisma/client";
import { iconMap } from "@/lib/iconMap";

const TaskImpactVisualization = ({
  task,
  dimension,
  impact,
  onComplete,
}: {
  task: Task & { dimension: Dimension };
  dimension: Dimension;
  impact: number;
  onComplete: () => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-[#1d2021] rounded-lg p-5 border border-[#3c3836] relative overflow-hidden"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <Particle key={i} color={dimension.color} speed={1.2} />
      ))}

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, 0] }}
            transition={{ stiffness: 300, damping: 15 }}
            className="h-12 w-12 rounded-full flex items-center justify-center"
          >
            {(() => {
              const IconComponent = iconMap[dimension.icon] || "BookOpen";
              return (
                <div className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent
                    className="h-6 w-6"
                    style={{
                      color: dimension.color,
                      borderColor: dimension.color,
                    }}
                  />
                </div>
              );
            })()}
          </motion.div>

          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#ebdbb2] font-medium"
            >
              {task.name}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-[#a89984]"
            >
              Impacts <span className="text-[#fe8019]">{dimension.name}</span>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a89984]">Impact</span>
                  <span className="text-[#fe8019]">
                    +{Math.round(impact * 100)}%
                  </span>
                </div>
                <div className="relative h-2 w-full bg-[#3c3836] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${impact * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: dimension.color }}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#fe8019] hover:text-[#fe8019] hover:bg-[#3c3836]"
                  onClick={() => {setBarWidth(0);onComplete()}}
                >
                  Continue <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TaskImpactVisualization;
