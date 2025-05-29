import { iconMap } from "@/lib/iconMap";
import { Dimension } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowUp, Check } from "lucide-react";

const DimensionProgressCard = ({
  dimension,
  previousValue,
  currentValue,
  tasksContributed,
  delay = 0,
}: {
  dimension: Dimension;
  previousValue: number;
  currentValue: number;
  tasksContributed: string[];
  delay?: number;
}) => {
  const growth = currentValue - previousValue;
  const IconComponent = iconMap[dimension.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-[#282828] border border-[#3c3836] rounded-lg overflow-hidden"
    >
      <div className="p-4 border-b border-[#3c3836] flex items-center">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 transition-all"
          style={{
            backgroundColor: `${dimension.color}15`,
            border: `1.5px solid ${dimension.color}`,
          }}
        >
          <IconComponent
            className="h-5 w-5 transition-transform group-hover:scale-110"
            style={{ color: dimension.color }}
          />
        </div>
        <div>
          <h3 className="text-[#ebdbb2] font-medium">{dimension.name}</h3>
          <p className="text-xs text-[#a89984]">{dimension.description}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#a89984]">Progress</span>
          <div className="flex items-center">
            <span className="text-sm text-[#ebdbb2]">{previousValue}%</span>
            <ArrowUp className="h-3 w-3 mx-1 text-[#fe8019]" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.5 }}
              className="text-sm font-medium text-[#fe8019]"
            >
              {currentValue}%
            </motion.span>
          </div>
        </div>
        <div className="relative h-2 bg-[#1d2021] rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-[#3c3836] rounded-full"
            initial={{ width: `${previousValue}%` }}
            animate={{ width: `${previousValue}%` }}
          />
          <motion.div
            className="absolute left-0 top-0 bottom-0 rounded-full"
            style={{ backgroundColor: dimension.color }}
            initial={{ width: `${previousValue}%` }}
            animate={{ width: `${currentValue}%` }}
            transition={{ delay: delay + 0.2, duration: 1 }}
          />
        </div>
        {growth > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: delay + 0.4, duration: 0.3 }}
            className="text-sm text-[#a89984] mb-2"
          >
            <span className="text-[#fe8019] font-medium">+{growth}%</span>{" "}
            growth from:
          </motion.div>
        )}
        <div className="space-y-2">
          {[...new Set(tasksContributed)].map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.5 + i * 0.1 }}
              className="flex items-center"
            >
              <div className="h-4 w-4 rounded-full bg-[#fe8019] flex items-center justify-center mr-2 flex-shrink-0">
                <Check className="h-2 w-2 text-[#1d2021]" />
              </div>
              <span className="text-xs text-[#ebdbb2]">{task}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DimensionProgressCard;
