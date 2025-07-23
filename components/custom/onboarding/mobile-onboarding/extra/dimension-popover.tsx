import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const DimensionPopover = ({
  dimension,
  show,
  onClose,
}: {
  dimension: {
    name: string;
    icon: React.ElementType;
    color: string;
    description: string;
  } | null;
  show: boolean;
  onClose: () => void;
}) => {
  if (!dimension) return null;

  const IconComponent = dimension.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-[#282828] rounded-2xl p-6 border border-[#3c3836] max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${dimension.color}20` }}
                >
                  <IconComponent
                    className="h-6 w-6"
                    style={{ color: dimension.color }}
                  />
                </div>
                <div>
                  <div className="text-[#ebdbb2] font-bold text-lg">
                    {dimension.name}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-[#a89984] hover:text-[#ebdbb2]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[#a89984] leading-relaxed">
              {dimension.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DimensionPopover;
