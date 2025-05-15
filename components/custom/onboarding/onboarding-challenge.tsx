import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Challenge, ChallengeTask, Dimension, Task } from "@prisma/client";

const ChallengeCard = ({
  challenge,
  isSelected = false,
  onSelect,
}: {
  challenge: Challenge & {
    tasks: ChallengeTask[] & { task: Task & { dimension: Dimension } };
  };
  isSelected?: boolean;
  onSelect: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className={cn(
          "bg-[#282828] border transition-all duration-300 h-full cursor-pointer overflow-hidden",
          isSelected
            ? "border-[#fe8019]"
            : "border-[#3c3836] hover:border-[#504945]"
        )}
        onClick={onSelect}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-[#ebdbb2]">
            <Award className="h-5 w-5 text-[#fe8019] mr-2 flex-shrink-0" />
            <p className="text-xl">{challenge.name}</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-[#a89984]">
            {challenge.description}
          </p>

          <div className="flex gap-2 flex-wrap">
            <Badge className="bg-[#3c3836] text-[#ebdbb2] hover:bg-[#504945] text-xs">
              {challenge.duration} days
            </Badge>
          </div>

          <div className="space-y-2">
            {challenge.tasks.slice(0, 3).map(({ task }, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full flex-shrink-0 mr-2"
                  style={{ backgroundColor: task.dimension.color }}
                ></div>
                <span className="text-xs text-[#ebdbb2] truncate">
                  {task.name}
                </span>
              </div>
            ))}
            {challenge.tasks.length > 3 && (
              <div className="text-xs text-[#a89984]">
                +{challenge.tasks.length - 3} more tasks
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          {isSelected ? (
            <Button
              className="w-full bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e]"
              size="sm"
            >
              Selected
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#fe8019]"
              size="sm"
            >
              Select Challenge
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
export default ChallengeCard;
