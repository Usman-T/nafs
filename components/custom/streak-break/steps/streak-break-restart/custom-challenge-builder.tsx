"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { iconMap } from "@/lib/iconMap";
import { BookOpen } from "lucide-react";
import { Challenge } from "@prisma/client";

interface CustomChallengeBuilderProps {
  customChallenge: {
    title: string;
    description: string;
    tasks: Array<{
      name: string;
      dimension: { name: string; color: string; icon: string };
    }>;
  };
  onUpdateChallenge: (updates: Partial<Challenge>) => void;
  onAddTask: () => void;
  onRemoveTask: (index: number) => void;
  onStartChallenge: () => void;
  canProceed: boolean;
  isLoading: boolean;
}

const CustomChallengeBuilder: React.FC<CustomChallengeBuilderProps> = ({
  customChallenge,
  onUpdateChallenge,
  onAddTask,
  onRemoveTask,
  onStartChallenge,
  canProceed,
  isLoading,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 px-6"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#ebdbb2]">
          Create Your Challenge
        </h2>
        <p className="text-[#a89984]">
          Build a personalized challenge with your own tasks
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#ebdbb2]">
            Challenge Title
          </label>
          <Input
            value={customChallenge.title}
            onChange={(e) => onUpdateChallenge({ title: e.target.value })}
            className="bg-[#282828] border-[#3c3836] text-[#ebdbb2]"
            placeholder="Enter challenge title"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#ebdbb2]">
            Description
          </label>
          <Textarea
            value={customChallenge.description}
            onChange={(e) => onUpdateChallenge({ description: e.target.value })}
            className="bg-[#282828] border-[#3c3836] text-[#ebdbb2]"
            placeholder="Describe your challenge"
            rows={3}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#ebdbb2]">
              Tasks ({customChallenge.tasks.length}/5)
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={onAddTask}
              disabled={customChallenge.tasks.length >= 5}
              className="border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          <div className="space-y-2">
            {customChallenge.tasks.map((task, index) => {
              const IconComponent = iconMap[task.dimension.icon] || BookOpen;
              return (
                <Card key={index} className="bg-[#282828] border-[#3c3836]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: `${task.dimension.color}20`,
                          }}
                        >
                          <IconComponent
                            className="w-4 h-4"
                            style={{ color: task.dimension.color }}
                          />
                        </div>
                        <div>
                          <p className="text-[#ebdbb2] font-medium">
                            {task.name}
                          </p>
                          <p className="text-[#a89984] text-sm">
                            {task.dimension.name}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveTask(index)}
                        className="text-[#fb4934] hover:bg-[#fb4934]/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {customChallenge.tasks.length < 3 && (
            <p className="text-[#fe8019] text-sm">
              Add at least 3 tasks to create your challenge
            </p>
          )}
        </div>
      </div>

      {canProceed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            onClick={onStartChallenge}
            disabled={isLoading}
            className="bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e] px-8"
          >
            {isLoading ? "Creating Challenge..." : "Start Challenge"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomChallengeBuilder;
