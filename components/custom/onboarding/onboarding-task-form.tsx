"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { iconMap } from "@/lib/iconMap";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dimension } from "@prisma/client";

const taskSuggestions = [
  { dimension: "Faith", text: "Pray 5 times on time" },
  { dimension: "Faith", text: "Make dua 5 mins" },
  { dimension: "Faith", text: "Read 1 Qur’an page" },

  // Remembrance
  { dimension: "Remembrance", text: "Do morning & evening adhkar" },
  { dimension: "Remembrance", text: "Say Astaghfirullah 100×" },
  { dimension: "Remembrance", text: "Send salawat 50×" },

  // Knowledge
  { dimension: "Knowledge", text: "Watch/read 10-min Islamic talk" },
  { dimension: "Knowledge", text: "Learn 3 Qur’anic words" },
  { dimension: "Knowledge", text: "Study 1 hadith" },

  // Character
  { dimension: "Character", text: "Speak kindly all day" },
  { dimension: "Character", text: "Show patience once" },
  { dimension: "Character", text: "Give sincere thanks" },

  // Discipline
  { dimension: "Discipline", text: "Wake at first Fajr alarm" },
  { dimension: "Discipline", text: "Fast or skip snacks" },
  { dimension: "Discipline", text: "Plan & follow day" },

  // Body
  { dimension: "Body", text: "Do 20-min workout" },
  { dimension: "Body", text: "Sleep 7+ hours" },
  { dimension: "Body", text: "Drink 8 glasses water" },

  // Purpose
  { dimension: "Purpose", text: "Write 3 goals" },
  { dimension: "Purpose", text: "1h on key project" },
  { dimension: "Purpose", text: "Check intentions" },
];

const CustomTaskForm = ({ onAdd, onCancel, dimensions, isOpen, setIsOpen }) => {
  const [taskName, setTaskName] = useState("");
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carouselApi, setCarouselApi] = useState();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState(taskSuggestions);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(dimensions.length / itemsPerPage);

  const dimensionPages = [];
  for (let i = 0; i < totalPages; i++) {
    dimensionPages.push(
      dimensions.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
    );
  }
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    carouselApi.on("select", () => {
      setCurrentPage(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  useEffect(() => {
    if (!selectedDimension) {
      setFilteredSuggestions(taskSuggestions);
    } else {
      setFilteredSuggestions(
        taskSuggestions.filter((s) =>
          dimensions.some((d) => d.name === s.dimension)
        )
      );
    }
  }, [selectedDimension, dimensions, taskName]);

  const handleSubmit = async () => {
    if (!taskName.trim() || !selectedDimension) return;

    setIsSubmitting(true);

    onAdd({
      name: taskName.trim(),
      dimension: selectedDimension,
    });

    // Reset form
    setTaskName("");
    setSelectedDimension(null);
    setIsSubmitting(false);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTaskName("");
    setSelectedDimension(null);
    setShowAutocomplete(false);
    onCancel();
    setIsOpen(false);
  };

  const goToPreviousPage = () => {
    if (carouselApi && currentPage > 0) {
      carouselApi.scrollTo(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (carouselApi && currentPage < totalPages - 1) {
      carouselApi.scrollTo(currentPage + 1);
    }
  };

  const goToPage = (pageIndex) => {
    if (carouselApi) {
      carouselApi.scrollTo(pageIndex);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
    setShowAutocomplete(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (suggestion: (typeof taskSuggestions)[0]) => {
    const dimensionIndex = dimensions.findIndex(
      (dim) => dim.name === suggestion.dimension
    );
    if (dimensionIndex !== -1) {
      const pageIndex = Math.floor(dimensionIndex / itemsPerPage);
      goToPage(pageIndex);
      setSelectedDimension(dimensions[dimensionIndex]);
    }
    setTaskName(suggestion.text);
    setShowAutocomplete(false);
    setSelectedSuggestionIndex(-1);
  };

  const toggleAutocomplete = () => {
    setShowAutocomplete(!showAutocomplete);
    setSelectedSuggestionIndex(-1);
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={() => {
        carouselApi?.scrollTo(1);
        setIsOpen(!isOpen);
      }}
    >
      <DrawerContent className="bg-[#1d2021] border-[#3c3836]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DrawerHeader className="pb-8 mb-2">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="p-2 rounded-full bg-[#fe8019]/20"
              >
                <Plus className="w-5 h-5 text-[#fe8019]" />
              </motion.div>
              <DrawerTitle className="text-[#ebdbb2] text-xl">
                Add New Task
              </DrawerTitle>
            </div>
          </DrawerHeader>
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 space-y-6 overflow-y-auto flex-1"
            >
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#ebdbb2] flex items-center gap-2">
                  Task Name
                  <span className="text-[#fe8019]">*</span>
                </label>
                <div className="relative">
                  <div className="relative">
                    <Input
                      value={taskName}
                      ref={inputRef}
                      onChange={handleInputChange}
                      placeholder="Enter task name"
                      className="bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder-[#665c54] focus:border-[#fe8019] focus:ring-[#fe8019]/20 pr-20"
                      maxLength={50}
                    />
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-[#665c54]">
                      {taskName.length}/50
                    </div>
                    <motion.button
                      type="button"
                      onClick={toggleAutocomplete}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-[#3c3836] hover:bg-[#504945] transition-colors"
                    >
                      <motion.div
                        animate={{ rotate: showAutocomplete ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-[#a89984]" />
                      </motion.div>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {showAutocomplete && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#282828] border border-[#3c3836] rounded-lg shadow-xl z-50 max-h-48 overflow-hidden"
                      >
                        <div className="overflow-y-auto max-h-64 scrollbar-thin scrollbar-thumb-[#504945] scrollbar-track-[#3c3836]">
                          {filteredSuggestions
                            .map((suggestion, index) => {
                              const dimension = dimensions.find(
                                (dim) => dim.name === suggestion.dimension
                              );
                              const IconComponent = iconMap[dimension.icon];
                              const iconColor = dimension.color;
                              const isSelected =
                                index === selectedSuggestionIndex;

                              return (
                                <motion.div
                                  key={`${suggestion.text}-${index}`}
                                  onClick={() =>
                                    handleSuggestionClick(suggestion)
                                  }
                                  className={`
                                  flex items-center gap-3 p-3 cursor-pointer transition-all duration-150
                                  ${
                                    isSelected
                                      ? "bg-[#fe8019]/20 border-l-2 border-[#fe8019]"
                                      : "hover:bg-[#3c3836]/50"
                                  }
                                `}
                                >
                                  <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{
                                      backgroundColor: `${iconColor}20`,
                                    }}
                                  >
                                    <IconComponent
                                      className="w-4 h-4"
                                      style={{ color: iconColor }}
                                    />
                                  </div>
                                  <span
                                    className={`
                                  text-sm transition-colors duration-150
                                  ${
                                    isSelected
                                      ? "text-[#fe8019]"
                                      : "text-[#ebdbb2]"
                                  }
                                `}
                                  >
                                    {suggestion.text}
                                  </span>
                                </motion.div>
                              );
                            })}
                          {filteredSuggestions.length === 0 && (
                            <div className="p-4 text-center text-[#665c54] text-sm">
                              No suggestions found
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {/* Dimension Selection */}
              <div className="relative ">
                <label className="text-sm font-medium text-[#ebdbb2] flex items-center gap-2 mb-2">
                  Choose Dimension
                  <span className="text-[#fe8019]">*</span>
                </label>
                <div className="relative ">
                  <Carousel
                    setApi={setCarouselApi}
                    className="w-full overflow-visible"
                    opts={{
                      align: "start",
                      dragFree: false,
                      loop: false,
                      slidesToScroll: 1,
                    }}
                  >
                    <CarouselContent className="w-full">
                      {dimensionPages.map((pageDimensions, pageIndex) => (
                        <CarouselItem
                          key={pageIndex}
                          className="w-full overflow-visible"
                        >
                          <div className="grid grid-cols-2 gap-4 overflow-visible">
                            {pageDimensions.map((dimension) => {
                              const IconComponent =
                                iconMap[dimension.icon] || BookOpen;
                              const isSelected =
                                selectedDimension?.id === dimension.id;
                              return (
                                <motion.div
                                  key={dimension.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    setSelectedDimension(dimension)
                                  }
                                  className={`
                                    relative p-4 rounded-xl cursor-pointer transition-all duration-200 group
                                    ${
                                      isSelected
                                        ? "bg-[#fe8019]/20 border-2 border-[#fe8019] shadow-lg shadow-[#fe8019]/20"
                                        : "bg-[#282828] border border-[#3c3836] hover:border-[#504945] hover:bg-[#3c3836]/50"
                                    }
                                  `}
                                >
                                  <div className="flex flex-col items-center text-center space-y-3">
                                    <div
                                      className={`
                                        w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200
                                        ${
                                          isSelected
                                            ? "bg-[#fe8019] shadow-lg"
                                            : "bg-[#3c3836] group-hover:bg-[#504945]"
                                        }
                                      `}
                                    >
                                      <IconComponent
                                        className="w-6 h-6"
                                        style={{
                                          color: isSelected
                                            ? "#1d2021"
                                            : dimension.color,
                                        }}
                                      />
                                    </div>
                                    <div
                                      className={`
                                        text-sm font-medium transition-colors duration-200
                                        ${
                                          isSelected
                                            ? "text-[#fe8019]"
                                            : "text-[#ebdbb2] group-hover:text-[#fe8019]"
                                        }
                                      `}
                                    >
                                      {dimension.name}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={goToPreviousPage}
                      disabled={currentPage === 0}
                      className="p-2 rounded-full bg-[#3c3836] hover:bg-[#504945] disabled:opacity-50 disabled:hover:bg-[#3c3836] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#a89984]" />
                    </motion.button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => goToPage(i)}
                          className={`
                            h-2 rounded-full transition-all duration-200
                            ${
                              i === currentPage
                                ? "bg-[#fe8019] w-6"
                                : "bg-[#3c3836] hover:bg-[#504945] w-2"
                            }
                          `}
                        />
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages - 1}
                      className="p-2 rounded-full bg-[#3c3836] hover:bg-[#504945] disabled:opacity-50 disabled:hover:bg-[#3c3836] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[#a89984]" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <DrawerFooter className="pt-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#ebdbb2] bg-transparent"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#fe8019] text-[#1d2021] hover:bg-[#d65d0e] disabled:bg-[#665c54] disabled:cursor-not-allowed"
                type="submit"
                disabled={
                  !taskName.trim() || !selectedDimension || isSubmitting
                }
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-[#1d2021] border-t-transparent rounded-full"
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Task
                  </>
                )}
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomTaskForm;
