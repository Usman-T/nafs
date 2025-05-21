import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const DimensionDetail = ({
  dimension,
  value,
  color,
  description,
  onClose,
}: {
  dimension: string;
  value: number;
  color: string;
  description: string;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-[#1d2021] rounded-lg p-5 border border-[#3c3836]"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-10 w-10 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div>
          <h3 className="text-[#ebdbb2] font-medium">{dimension}</h3>
          <div className="text-sm text-[#a89984]">
            {Math.round(value * 100)}% developed
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="relative h-2 w-full bg-[#3c3836] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value * 100}%` }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        <p className="text-sm text-[#a89984]">{description}</p>

        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DimensionDetail;
