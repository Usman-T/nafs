"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Loading from "@/components/ui/loading";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  Star,
  Lightbulb,
  Zap,
  Clock,
  Trophy,
  X,
} from "lucide-react";
import {
  FlashcardSection,
  MemoryGameSection,
  FillInBlankSection,
  AudioLessonSection,
  ReflectionSection,
} from "@/components/custom/lessons/lessons-types";

// Enhanced lesson data with new types
const lessonData = {
  1: {
    1: {
      id: 1,
      title: "Introduction to the Quran",
      description: "Learn about the structure and importance of the Quran",
      type: "interactive",
      duration: 15,
      xp: 100,
      content: {
        sections: [
          {
            type: "text",
            title: "What is the Quran?",
            content:
              "The Quran is the holy book of Islam, believed by Muslims to be the direct word of Allah as revealed to Prophet Muhammad (peace be upon him) through the angel Gabriel (Jibril).",
            image: "/placeholder.svg?height=200&width=400",
          },
          {
            type: "quiz",
            title: "Quick Check",
            question: "How many chapters (surahs) are in the Quran?",
            options: ["110", "114", "120", "124"],
            correct: 1,
            explanation:
              "The Quran contains 114 chapters called surahs, ranging from 3 to 286 verses each.",
          },
          {
            type: "interactive",
            title: "Quran Structure",
            content:
              "Drag and drop to arrange the Quran's structure from largest to smallest:",
            items: ["Quran", "Surah", "Ayah", "Word"],
            correctOrder: [0, 1, 2, 3],
          },
        ],
      },
    },
    2: {
      id: 2,
      title: "Arabic Alphabet Flashcards",
      description: "Master Arabic letters with interactive flashcards",
      type: "flashcard",
      duration: 20,
      xp: 150,
      content: {
        sections: [
          {
            type: "flashcard",
            title: "Arabic Letters",
            description:
              "Learn the Arabic alphabet with interactive flashcards",
            cards: [
              {
                front: "ا",
                back: "Alif",
                frontIcon: "🔤",
                backIcon: "📝",
                explanation: "The first letter of the Arabic alphabet",
              },
              {
                front: "ب",
                back: "Ba",
                frontIcon: "🔤",
                backIcon: "📝",
                explanation: "Pronounced like 'b' in 'book'",
              },
              {
                front: "ت",
                back: "Ta",
                frontIcon: "🔤",
                backIcon: "📝",
                explanation: "Pronounced like 't' in 'top'",
              },
              {
                front: "ث",
                back: "Tha",
                frontIcon: "🔤",
                backIcon: "📝",
                explanation: "Pronounced like 'th' in 'think'",
              },
              {
                front: "ج",
                back: "Jim",
                frontIcon: "🔤",
                backIcon: "📝",
                explanation: "Pronounced like 'j' in 'jam'",
              },
              {
                front: "ح",
                back: "Ha",
                frontIcon: "🔤",
                backIcon: "📝",
                explanation: "A breathy 'h' sound",
              },
            ],
          },
        ],
      },
    },
    3: {
      id: 3,
      title: "Quran Memory Challenge",
      description: "Test your knowledge with a fun memory game",
      type: "memory",
      duration: 15,
      xp: 125,
      content: {
        sections: [
          {
            type: "memory",
            title: "Match the Pairs",
            description: "Match Arabic terms with their English meanings",
            pairs: [
              { first: "الله", second: "Allah" },
              { first: "صلاة", second: "Prayer" },
              { first: "قرآن", second: "Quran" },
              { first: "إسلام", second: "Islam" },
              { first: "مسجد", second: "Mosque" },
              { first: "رمضان", second: "Ramadan" },
            ],
          },
        ],
      },
    },
    4: {
      id: 4,
      title: "Complete the Verse",
      description: "Fill in the missing words from Quranic verses",
      type: "fillblank",
      duration: 18,
      xp: 140,
      content: {
        sections: [
          {
            type: "fillblank",
            title: "Surah Al-Fatihah",
            description: "Complete the missing words in the opening chapter",
            text: "In the name of ___, the Most Gracious, the Most ___. Praise be to Allah, Lord of all the ___.",
            blanks: [
              { answer: "Allah" },
              { answer: "Merciful" },
              { answer: "worlds" },
            ],
            hints: [
              "The name of God in Arabic",
              "One of Allah's beautiful names meaning compassionate",
              "Everything that exists in creation",
            ],
          },
        ],
      },
    },
    5: {
      id: 5,
      title: "Quran Recitation",
      description: "Listen to beautiful Quranic recitation",
      type: "audio",
      duration: 12,
      xp: 100,
      content: {
        sections: [
          {
            type: "audio",
            title: "Surah Al-Fatihah Recitation",
            description:
              "Listen to the beautiful recitation of the opening chapter",
            audioTitle: "Surah Al-Fatihah",
            reciter: "Sheikh Abdul Rahman Al-Sudais",
            duration: 180,
            transcript:
              "Bismillahi rahmani raheem. Alhamdulillahi rabbil alameen. Ar-rahmani raheem. Maliki yawmideen. Iyyaka na'budu wa iyyaka nasta'een. Ihdinas siratal mustaqeem. Siratal latheena an'amta alayhim ghayril maghdoobi alayhim wa la daaleen.",
            keyPoints: [
              "Al-Fatihah is recited in every unit of prayer",
              "It contains praise, worship, and supplication",
              "Known as the 'Mother of the Quran'",
              "Contains the essence of the entire Quran",
            ],
          },
        ],
      },
    },
    6: {
      id: 6,
      title: "Personal Reflection",
      description: "Reflect on your spiritual journey",
      type: "reflection",
      duration: 25,
      xp: 200,
      content: {
        sections: [
          {
            type: "reflection",
            title: "Spiritual Reflection",
            description:
              "Take time to reflect on your relationship with the Quran",
            prompts: [
              "How has reading the Quran impacted your daily life?",
              "What verse or chapter resonates most with you and why?",
              "How do you plan to incorporate Quranic teachings into your routine?",
              "What challenges do you face in understanding the Quran?",
            ],
          },
        ],
      },
    },
  },
};

// Sample path data
const pathData = {
  1: {
    id: 1,
    title: "Quran Basics",
    description: "Learn the fundamentals of Quran reading and understanding",
    color: "#8ec07c",
    totalLessons: 12,
    completedLessons: 1,
  },
};

// Lesson completion popup
const LessonCompletionPopup = ({
  lesson,
  xpEarned,
  onClose,
  onNext,
}: {
  lesson: any;
  xpEarned: number;
  onClose: () => void;
  onNext: () => void;
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#282828] rounded-xl border border-[#3c3836] p-6 max-w-md w-full mx-4 relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Celebration particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#8ec07c] opacity-20"
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: 0.2,
            }}
            className="h-20 w-20 rounded-full bg-[#8ec07c] mx-auto flex items-center justify-center mb-4"
          >
            <Trophy className="h-10 w-10 text-[#1d2021]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-[#ebdbb2] mb-2"
          >
            Lesson Completed!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#a89984] mb-4"
          >
            Great job completing "{lesson.title}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Badge className="bg-[#fabd2f] text-[#1d2021] text-lg py-1 px-3">
              +{xpEarned} XP
            </Badge>
            <Badge className="bg-[#fe8019] text-[#1d2021] text-lg py-1 px-3">
              <Star className="h-4 w-4 mr-1" />
              Perfect!
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <Button
              variant="outline"
              className="flex-1 border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              onClick={onClose}
            >
              Review Lesson
            </Button>
            <Button
              className="flex-1 bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90"
              onClick={onNext}
            >
              Next Lesson <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Quiz component
const QuizSection = ({
  section,
  onAnswer,
  answered,
  selectedAnswer,
}: {
  section: any;
  onAnswer: (index: number) => void;
  answered: boolean;
  selectedAnswer: number | null;
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">
          {section.title}
        </h3>
        <p className="text-[#a89984]">{section.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {section.options.map((option: string, index: number) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === section.correct;
          const showResult = answered;

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border text-left transition-all ${
                showResult
                  ? isCorrect
                    ? "bg-[#8ec07c]/20 border-[#8ec07c] text-[#8ec07c]"
                    : isSelected
                    ? "bg-[#fb4934]/20 border-[#fb4934] text-[#fb4934]"
                    : "bg-[#282828] border-[#3c3836] text-[#a89984]"
                  : isSelected
                  ? "bg-[#3c3836] border-[#fe8019] text-[#ebdbb2]"
                  : "bg-[#282828] border-[#3c3836] text-[#ebdbb2] hover:border-[#504945]"
              }`}
              onClick={() => !answered && onAnswer(index)}
              disabled={answered}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    showResult && isCorrect
                      ? "border-[#8ec07c] bg-[#8ec07c]"
                      : showResult && isSelected && !isCorrect
                      ? "border-[#fb4934] bg-[#fb4934]"
                      : isSelected
                      ? "border-[#fe8019] bg-[#fe8019]"
                      : "border-[#504945]"
                  }`}
                >
                  {showResult && isCorrect && (
                    <CheckCircle className="h-4 w-4 text-[#1d2021]" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X className="h-4 w-4 text-[#1d2021]" />
                  )}
                  {!showResult && isSelected && (
                    <Circle className="h-3 w-3 bg-[#1d2021] rounded-full" />
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]"
        >
          <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-[#fabd2f]" />
            Explanation
          </h4>
          <p className="text-[#a89984] text-sm">{section.explanation}</p>
        </motion.div>
      )}
    </div>
  );
};

// Interactive drag and drop component
const InteractiveSection = ({
  section,
  onComplete,
  completed,
}: {
  section: any;
  onComplete: () => void;
  completed: boolean;
}) => {
  const [items, setItems] = useState(
    section.items.map((item: string, index: number) => ({
      id: index,
      text: item,
    }))
  );
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newItems = [...items];
    const draggedItemData = newItems[draggedItem];
    newItems.splice(draggedItem, 1);
    newItems.splice(dropIndex, 0, draggedItemData);
    setItems(newItems);
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    const isCorrect = items.every(
      (item, index) => item.id === section.correctOrder[index]
    );
    if (isCorrect) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">
          {section.title}
        </h3>
        <p className="text-[#a89984]">{section.content}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            className={`p-4 rounded-lg border cursor-move transition-all ${
              completed
                ? "bg-[#8ec07c]/20 border-[#8ec07c] text-[#8ec07c]"
                : "bg-[#282828] border-[#3c3836] text-[#ebdbb2] hover:border-[#504945]"
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, rotate: 2 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-[#3c3836] flex items-center justify-center text-sm font-medium text-[#a89984]">
                {index + 1}
              </div>
              <span className="font-medium">{item.text}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {!completed && (
        <div className="text-center">
          <Button
            className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            onClick={checkAnswer}
          >
            Check Answer
          </Button>
        </div>
      )}
    </div>
  );
};

// Main lesson page component
export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = Number(params.pathId);
  const lessonId = Number(params.lessonId);

  const [isLoading, setIsLoading] = useState(true);
  const [lesson, setLesson] = useState<any>(null);
  const [path, setPath] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState<
    Record<number, boolean>
  >({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>(
    {}
  );
  const [showCompletion, setShowCompletion] = useState(false);
  const [totalXp, setTotalXp] = useState(0);

  // Load lesson data
  useEffect(() => {
    const timer = setTimeout(() => {
      const lessonData_typed = lessonData as any;
      const foundLesson = lessonData_typed[pathId]?.[lessonId];
      const foundPath = pathData[pathId as keyof typeof pathData];

      if (foundLesson && foundPath) {
        setLesson(foundLesson);
        setPath(foundPath);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathId, lessonId]);

  const handleQuizAnswer = (sectionIndex: number, answerIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [sectionIndex]: answerIndex }));

    // Mark section as complete after a delay
    setTimeout(() => {
      setSectionProgress((prev) => ({ ...prev, [sectionIndex]: true }));
    }, 2000);
  };

  const handleSectionComplete = (sectionIndex: number) => {
    setSectionProgress((prev) => ({ ...prev, [sectionIndex]: true }));
  };

  const nextSection = () => {
    if (currentSection < lesson.content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson complete
      setTotalXp(lesson.xp);
      setShowCompletion(true);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const goBack = () => {
    router.push("/dashboard/guidance");
  };

  const nextLesson = () => {
    // Navigate to next lesson or back to guidance
    setShowCompletion(false);
    router.push("/dashboard/guidance");
  };

  if (isLoading) {
    return <Loading fullScreen text="Loading lesson..." />;
  }

  if (!lesson || !path) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#ebdbb2]">
          Lesson not found
        </h1>
        <Button
          className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Guidance
        </Button>
      </div>
    );
  }

  const currentSectionData = lesson.content.sections[currentSection];
  const progress =
    ((currentSection + 1) / lesson.content.sections.length) * 100;
  const completedSections = Object.keys(sectionProgress).length;

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#1d2021] border-b border-[#3c3836]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              onClick={goBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="text-center">
              <h1 className="text-lg font-semibold text-[#ebdbb2]">
                {lesson.title}
              </h1>
              <p className="text-sm text-[#a89984]">{path.title}</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge className="bg-[#fabd2f] text-[#1d2021]">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}m
              </Badge>
              <Badge className="bg-[#8ec07c] text-[#1d2021]">
                <Zap className="h-3 w-3 mr-1" />
                {lesson.xp} XP
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#a89984]">Progress</span>
              <span className="text-[#ebdbb2]">
                {currentSection + 1} of {lesson.content.sections.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-[#282828] border-[#3c3836]">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentSectionData.type === "text" && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-[#ebdbb2] mb-4">
                        {currentSectionData.title}
                      </h2>
                    </div>

                    {currentSectionData.image && (
                      <div className="flex justify-center mb-6">
                        <img
                          src={currentSectionData.image || "/placeholder.svg"}
                          alt={currentSectionData.title}
                          className="rounded-lg border border-[#3c3836] max-w-md w-full"
                        />
                      </div>
                    )}

                    <div className="prose prose-invert max-w-none">
                      <p className="text-[#a89984] text-lg leading-relaxed">
                        {currentSectionData.content}
                      </p>
                    </div>
                  </div>
                )}

                {currentSectionData.type === "quiz" && (
                  <QuizSection
                    section={currentSectionData}
                    onAnswer={(index) =>
                      handleQuizAnswer(currentSection, index)
                    }
                    answered={quizAnswers[currentSection] !== undefined}
                    selectedAnswer={quizAnswers[currentSection] || null}
                  />
                )}

                {currentSectionData.type === "interactive" && (
                  <InteractiveSection
                    section={currentSectionData}
                    onComplete={() => handleSectionComplete(currentSection)}
                    completed={sectionProgress[currentSection] || false}
                  />
                )}

                {currentSectionData.type === "flashcard" && (
                  <FlashcardSection
                    section={currentSectionData}
                    onComplete={() => handleSectionComplete(currentSection)}
                    completed={sectionProgress[currentSection] || false}
                  />
                )}

                {currentSectionData.type === "memory" && (
                  <MemoryGameSection
                    section={currentSectionData}
                    onComplete={() => handleSectionComplete(currentSection)}
                    completed={sectionProgress[currentSection] || false}
                  />
                )}

                {currentSectionData.type === "fillblank" && (
                  <FillInBlankSection
                    section={currentSectionData}
                    onComplete={() => handleSectionComplete(currentSection)}
                    completed={sectionProgress[currentSection] || false}
                  />
                )}

                {currentSectionData.type === "audio" && (
                  <AudioLessonSection
                    section={currentSectionData}
                    onComplete={() => handleSectionComplete(currentSection)}
                    completed={sectionProgress[currentSection] || false}
                  />
                )}

                {currentSectionData.type === "reflection" && (
                  <ReflectionSection
                    section={currentSectionData}
                    onComplete={() => handleSectionComplete(currentSection)}
                    completed={sectionProgress[currentSection] || false}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={prevSection}
            disabled={currentSection === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {lesson.content.sections.map((_: any, index: number) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-all ${
                  index < currentSection
                    ? "bg-[#8ec07c]"
                    : index === currentSection
                    ? "bg-[#fe8019]"
                    : "bg-[#3c3836]"
                }`}
              />
            ))}
          </div>

          <Button
            className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            onClick={nextSection}
            disabled={
              (currentSectionData.type === "quiz" &&
                quizAnswers[currentSection] === undefined) ||
              ((currentSectionData.type === "interactive" ||
                currentSectionData.type === "flashcard" ||
                currentSectionData.type === "memory" ||
                currentSectionData.type === "fillblank" ||
                currentSectionData.type === "audio" ||
                currentSectionData.type === "reflection") &&
                !sectionProgress[currentSection])
            }
          >
            {currentSection === lesson.content.sections.length - 1
              ? "Complete Lesson"
              : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Completion popup */}
      <AnimatePresence>
        {showCompletion && (
          <LessonCompletionPopup
            lesson={lesson}
            xpEarned={totalXp}
            onClose={() => setShowCompletion(false)}
            onNext={nextLesson}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
