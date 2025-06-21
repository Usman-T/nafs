"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Star,
  Lightbulb,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Volume2,
  BookOpen,
  Brain,
  Target,
  Shuffle,
  Check,
  X,
  Heart,
  Award,
} from "lucide-react"

// Flashcard component
export const FlashcardSection = ({
  section,
  onComplete,
  completed,
}: {
  section: any
  onComplete: () => void
  completed: boolean
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [masteredCards, setMasteredCards] = useState<Set<number>>(new Set())
  const [shuffled, setShuffled] = useState(false)
  const [cards, setCards] = useState(section.cards)

  const currentCard = cards[currentCardIndex]
  const progress = (masteredCards.size / cards.length) * 100

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    } else if (masteredCards.size === cards.length) {
      onComplete()
    } else {
      // Restart with unmastered cards
      setCurrentCardIndex(0)
      setIsFlipped(false)
    }
  }

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const markAsMastered = (mastered: boolean) => {
    const newMastered = new Set(masteredCards)
    if (mastered) {
      newMastered.add(currentCardIndex)
    } else {
      newMastered.delete(currentCardIndex)
    }
    setMasteredCards(newMastered)

    if (newMastered.size === cards.length) {
      setTimeout(() => onComplete(), 1000)
    } else {
      nextCard()
    }
  }

  const shuffleCards = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffledCards)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setShuffled(true)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">{section.title}</h3>
        <p className="text-[#a89984] mb-4">{section.description}</p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <Badge className="bg-[#3c3836] text-[#a89984]">
            Card {currentCardIndex + 1} of {cards.length}
          </Badge>
          <Badge className="bg-[#8ec07c] text-[#1d2021]">{masteredCards.size} mastered</Badge>
        </div>

        <div className="w-full bg-[#3c3836] rounded-full h-2 mb-6">
          <motion.div
            className="bg-[#8ec07c] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="relative w-80 h-48 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 w-full h-full bg-[#282828] border border-[#3c3836] rounded-xl p-6 flex flex-col items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-center">
                <div className="text-3xl mb-4">{currentCard.frontIcon}</div>
                <p className="text-lg font-medium text-[#ebdbb2]">{currentCard.front}</p>
                <p className="text-sm text-[#a89984] mt-2">Click to reveal</p>
              </div>
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 w-full h-full bg-[#fe8019] border border-[#fe8019] rounded-xl p-6 flex flex-col items-center justify-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="text-center">
                <div className="text-3xl mb-4 text-[#1d2021]">{currentCard.backIcon}</div>
                <p className="text-lg font-medium text-[#1d2021]">{currentCard.back}</p>
                {currentCard.explanation && <p className="text-sm text-[#1d2021]/80 mt-2">{currentCard.explanation}</p>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4"
        >
          <Button
            variant="outline"
            className="border-[#fb4934] text-[#fb4934] hover:bg-[#fb4934] hover:text-[#1d2021]"
            onClick={() => markAsMastered(false)}
          >
            <X className="h-4 w-4 mr-2" />
            Need Practice
          </Button>
          <Button className="bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90" onClick={() => markAsMastered(true)}>
            <Check className="h-4 w-4 mr-2" />
            Got It!
          </Button>
        </motion.div>
      )}

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
          onClick={prevCard}
          disabled={currentCardIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <Button
          variant="outline"
          className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
          onClick={shuffleCards}
        >
          <Shuffle className="h-4 w-4 mr-2" />
          Shuffle
        </Button>

        <Button
          variant="outline"
          className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
          onClick={nextCard}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

// Memory game component
export const MemoryGameSection = ({
  section,
  onComplete,
  completed,
}: {
  section: any
  onComplete: () => void
  completed: boolean
}) => {
  const [cards, setCards] = useState<any[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    // Create pairs and shuffle
    const pairs = section.pairs.flatMap((pair: any, index: number) => [
      { id: `${index}-a`, content: pair.first, pairId: index, type: "first" },
      { id: `${index}-b`, content: pair.second, pairId: index, type: "second" },
    ])
    setCards(pairs.sort(() => Math.random() - 0.5))
  }, [section.pairs])

  const flipCard = (cardIndex: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardIndex)) return

    const newFlippedCards = [...flippedCards, cardIndex]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlippedCards
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.pairId === secondCard.pairId) {
        // Match found
        setMatchedPairs((prev) => new Set([...prev, firstCard.pairId.toString()]))
        setFlippedCards([])

        if (matchedPairs.size + 1 === section.pairs.length) {
          setTimeout(() => onComplete(), 1000)
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  const resetGame = () => {
    setFlippedCards([])
    setMatchedPairs(new Set())
    setMoves(0)
    setGameStarted(false)
    const pairs = section.pairs.flatMap((pair: any, index: number) => [
      { id: `${index}-a`, content: pair.first, pairId: index, type: "first" },
      { id: `${index}-b`, content: pair.second, pairId: index, type: "second" },
    ])
    setCards(pairs.sort(() => Math.random() - 0.5))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">{section.title}</h3>
        <p className="text-[#a89984] mb-4">{section.description}</p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <Badge className="bg-[#3c3836] text-[#a89984]">
            <Brain className="h-3 w-3 mr-1" />
            Moves: {moves}
          </Badge>
          <Badge className="bg-[#8ec07c] text-[#1d2021]">
            <Target className="h-3 w-3 mr-1" />
            Pairs: {matchedPairs.size}/{section.pairs.length}
          </Badge>
        </div>
      </div>

      {!gameStarted ? (
        <div className="text-center">
          <div className="bg-[#282828] rounded-lg p-8 border border-[#3c3836] mb-4">
            <Brain className="h-16 w-16 text-[#fe8019] mx-auto mb-4" />
            <h4 className="text-lg font-medium text-[#ebdbb2] mb-2">Memory Challenge</h4>
            <p className="text-[#a89984] mb-4">
              Match the pairs by flipping cards. Try to complete it in as few moves as possible!
            </p>
            <Button className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90" onClick={() => setGameStarted(true)}>
              <Play className="h-4 w-4 mr-2" />
              Start Game
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {cards.map((card, index) => {
              const isFlipped = flippedCards.includes(index) || matchedPairs.has(card.pairId.toString())
              const isMatched = matchedPairs.has(card.pairId.toString())

              return (
                <motion.div
                  key={card.id}
                  className="aspect-square cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => flipCard(index)}
                >
                  <motion.div
                    className="relative w-full h-full"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card back */}
                    <div
                      className="absolute inset-0 bg-[#3c3836] rounded-lg flex items-center justify-center border border-[#504945]"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div className="text-2xl">🎯</div>
                    </div>

                    {/* Card front */}
                    <div
                      className={`absolute inset-0 rounded-lg flex items-center justify-center border text-center p-2 ${
                        isMatched
                          ? "bg-[#8ec07c] border-[#8ec07c] text-[#1d2021]"
                          : "bg-[#282828] border-[#3c3836] text-[#ebdbb2]"
                      }`}
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      <span className="text-sm font-medium">{card.content}</span>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              onClick={resetGame}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Game
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

// Fill in the blank component
export const FillInBlankSection = ({
  section,
  onComplete,
  completed,
}: {
  section: any
  onComplete: () => void
  completed: boolean
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerChange = (blankIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [blankIndex]: value }))
  }

  const checkAnswers = () => {
    let correctCount = 0
    section.blanks.forEach((blank: any, index: number) => {
      const userAnswer = answers[index]?.toLowerCase().trim()
      const correctAnswer = blank.answer.toLowerCase().trim()
      if (userAnswer === correctAnswer) {
        correctCount++
      }
    })

    setScore(correctCount)
    setSubmitted(true)

    if (correctCount === section.blanks.length) {
      setTimeout(() => onComplete(), 2000)
    }
  }

  const renderTextWithBlanks = () => {
    const text = section.text
    let blankIndex = 0

    return text.split("___").map((part: string, index: number) => (
      <span key={index}>
        {part}
        {index < section.blanks.length && (
          <span className="inline-block mx-1">
            <Input
              className={`inline-block w-32 h-8 text-center border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent ${
                submitted
                  ? answers[blankIndex]?.toLowerCase().trim() === section.blanks[blankIndex].answer.toLowerCase().trim()
                    ? "border-[#8ec07c] text-[#8ec07c]"
                    : "border-[#fb4934] text-[#fb4934]"
                  : "border-[#fe8019] text-[#ebdbb2]"
              }`}
              value={answers[blankIndex] || ""}
              onChange={(e) => handleAnswerChange(blankIndex++, e.target.value)}
              disabled={submitted}
              placeholder="?"
            />
          </span>
        )}
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">{section.title}</h3>
        <p className="text-[#a89984] mb-4">{section.description}</p>
      </div>

      <div className="bg-[#282828] rounded-lg p-6 border border-[#3c3836]">
        <div className="text-lg leading-relaxed text-[#ebdbb2]">{renderTextWithBlanks()}</div>
      </div>

      {section.hints && (
        <div className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
          <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-[#fabd2f]" />
            Hints
          </h4>
          <ul className="text-[#a89984] text-sm space-y-1">
            {section.hints.map((hint: string, index: number) => (
              <li key={index}>• {hint}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[#ebdbb2] font-medium flex items-center">
              <Award className="h-4 w-4 mr-2 text-[#fabd2f]" />
              Results
            </h4>
            <Badge
              className={
                score === section.blanks.length ? "bg-[#8ec07c] text-[#1d2021]" : "bg-[#fe8019] text-[#1d2021]"
              }
            >
              {score}/{section.blanks.length} Correct
            </Badge>
          </div>

          <div className="space-y-2">
            {section.blanks.map((blank: any, index: number) => {
              const userAnswer = answers[index]?.toLowerCase().trim()
              const correctAnswer = blank.answer.toLowerCase().trim()
              const isCorrect = userAnswer === correctAnswer

              return (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-[#a89984]">Blank {index + 1}:</span>
                  <div className="flex items-center gap-2">
                    <span className={isCorrect ? "text-[#8ec07c]" : "text-[#fb4934]"}>
                      {answers[index] || "(empty)"}
                    </span>
                    {!isCorrect && <span className="text-[#8ec07c]">→ {blank.answer}</span>}
                    {isCorrect ? (
                      <Check className="h-4 w-4 text-[#8ec07c]" />
                    ) : (
                      <X className="h-4 w-4 text-[#fb4934]" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      <div className="text-center">
        {!submitted ? (
          <Button
            className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            onClick={checkAnswers}
            disabled={Object.keys(answers).length === 0}
          >
            Check Answers
          </Button>
        ) : (
          <Button
            className="bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
              setScore(0)
            }}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

// Audio lesson component
export const AudioLessonSection = ({
  section,
  onComplete,
  completed,
}: {
  section: any
  onComplete: () => void
  completed: boolean
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(section.duration || 300) // 5 minutes default
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [volume, setVolume] = useState(0.8)

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying && currentTime === 0) {
      // Start playing simulation
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            onComplete()
            clearInterval(interval)
            return duration
          }
          return prev + 1
        })
      }, 1000 / playbackSpeed)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / duration) * 100

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">{section.title}</h3>
        <p className="text-[#a89984] mb-4">{section.description}</p>
      </div>

      <div className="bg-[#282828] rounded-lg p-6 border border-[#3c3836]">
        <div className="text-center mb-6">
          <div className="h-32 w-32 rounded-full bg-[#fe8019] mx-auto flex items-center justify-center mb-4">
            <Volume2 className="h-16 w-16 text-[#1d2021]" />
          </div>
          <h4 className="text-lg font-medium text-[#ebdbb2] mb-2">{section.audioTitle}</h4>
          <p className="text-[#a89984]">Recited by {section.reciter}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[#a89984] mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="w-full bg-[#3c3836] rounded-full h-2">
            <motion.div
              className="bg-[#fe8019] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            className="h-12 w-12 bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
            onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed and volume controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#a89984]">Speed:</span>
            <select
              className="bg-[#3c3836] text-[#ebdbb2] rounded px-2 py-1 text-sm"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-[#a89984]" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>
      </div>

      {section.transcript && (
        <div className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
          <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
            <BookOpen className="h-4 w-4 mr-2 text-[#fe8019]" />
            Transcript
          </h4>
          <p className="text-[#a89984] text-sm leading-relaxed">{section.transcript}</p>
        </div>
      )}

      {section.keyPoints && (
        <div className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
          <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
            <Star className="h-4 w-4 mr-2 text-[#fabd2f]" />
            Key Points
          </h4>
          <ul className="text-[#a89984] text-sm space-y-1">
            {section.keyPoints.map((point: string, index: number) => (
              <li key={index}>• {point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// Reflection component
export const ReflectionSection = ({
  section,
  onComplete,
  completed,
}: {
  section: any
  onComplete: () => void
  completed: boolean
}) => {
  const [reflection, setReflection] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (reflection.trim().length > 0) {
      setSubmitted(true)
      setTimeout(() => onComplete(), 1000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">{section.title}</h3>
        <p className="text-[#a89984] mb-4">{section.description}</p>
      </div>

      <div className="bg-[#282828] rounded-lg p-6 border border-[#3c3836]">
        <div className="text-center mb-6">
          <Heart className="h-16 w-16 text-[#d3869b] mx-auto mb-4" />
          <h4 className="text-lg font-medium text-[#ebdbb2] mb-2">Personal Reflection</h4>
        </div>

        <div className="space-y-4">
          {section.prompts.map((prompt: string, index: number) => (
            <div key={index} className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]">
              <p className="text-[#ebdbb2] mb-2">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Share your thoughts and reflections..."
          className="min-h-32 bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          disabled={submitted}
        />

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#a89984]">{reflection.length} characters</span>

          {!submitted ? (
            <Button
              className="bg-[#d3869b] text-[#1d2021] hover:bg-[#d3869b]/90"
              onClick={handleSubmit}
              disabled={reflection.trim().length === 0}
            >
              <Heart className="h-4 w-4 mr-2" />
              Submit Reflection
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-[#8ec07c]"
            >
              <Check className="h-4 w-4" />
              <span>Reflection saved</span>
            </motion.div>
          )}
        </div>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1d2021] rounded-lg p-4 border border-[#3c3836]"
        >
          <h4 className="text-[#ebdbb2] font-medium mb-2 flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-[#fabd2f]" />
            Thank you for reflecting!
          </h4>
          <p className="text-[#a89984] text-sm">
            Your personal reflections help deepen your understanding and connection with the teachings. Keep up the
            great work on your spiritual journey!
          </p>
        </motion.div>
      )}
    </div>
  )
}
