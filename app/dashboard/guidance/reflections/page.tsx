"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Search, MessageSquare, Heart, SortDesc, Edit3, Trash2, Share2, Plus } from "lucide-react"
import Loading from "@/components/ui/loading"

// Sample reflections data
const reflections = [
  {
    id: 1,
    verse: "Al-Fatihah 1:1",
    surahId: 1,
    ayahId: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    reflection:
      "Starting everything with Bismillah has transformed my daily routine. It reminds me that Allah is with me in every action, big or small. This simple phrase brings so much barakah and peace to my heart.",
    date: "2024-01-15",
    tags: ["barakah", "daily-routine", "peace"],
    mood: "grateful",
    favorite: true,
  },
  {
    id: 2,
    verse: "Al-Fatihah 1:2",
    surahId: 1,
    ayahId: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    reflection:
      "Alhamdulillah for everything - the good and the challenging. This verse teaches me that all praise belongs to Allah, and even in difficult times, I can find reasons to be grateful. It's a complete mindset shift.",
    date: "2024-01-14",
    tags: ["gratitude", "mindset", "challenges"],
    mood: "reflective",
    favorite: false,
  },
  {
    id: 3,
    verse: "Al-Fatihah 1:5",
    surahId: 1,
    ayahId: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    reflection:
      "This verse perfectly captures the balance between worship and seeking help. We worship Allah alone, but we also turn to Him alone for assistance. It's a reminder of our complete dependence on Allah and the beauty of that relationship.",
    date: "2024-01-13",
    tags: ["worship", "dependence", "relationship"],
    mood: "inspired",
    favorite: true,
  },
  {
    id: 4,
    verse: "Al-Fatihah 1:6",
    surahId: 1,
    ayahId: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    reflection:
      "The most important dua we can make - asking for guidance to the straight path. I realize I need this guidance every single day, in every decision. It's not a one-time thing but a continuous journey.",
    date: "2024-01-12",
    tags: ["guidance", "dua", "journey"],
    mood: "hopeful",
    favorite: false,
  },
]

const moodColors = {
  grateful: "#8ec07c",
  reflective: "#83a598",
  inspired: "#fabd2f",
  hopeful: "#d3869b",
  peaceful: "#fe8019",
}

const ReflectionCard = ({
  reflection,
  onEdit,
  onDelete,
  onShare,
  onViewVerse,
}: {
  reflection: (typeof reflections)[0]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onShare: (id: number) => void
  onViewVerse: (surahId: number, ayahId: number) => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="cursor-pointer"
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden relative group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: moodColors[reflection.mood as keyof typeof moodColors] }}
              />
              <div>
                <Badge
                  className="bg-[#3c3836] text-[#a89984] cursor-pointer hover:bg-[#504945]"
                  onClick={() => onViewVerse(reflection.surahId, reflection.ayahId)}
                >
                  {reflection.verse}
                </Badge>
                <p className="text-xs text-[#a89984] mt-1">
                  {new Date(reflection.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {reflection.favorite && <Heart className="h-4 w-4 text-[#d3869b] fill-current" />}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2]"
                onClick={() => onEdit(reflection.id)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2]"
                onClick={() => onShare(reflection.id)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-red-400"
                onClick={() => onDelete(reflection.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="mb-4 p-3 rounded-lg bg-[#1d2021] border border-[#3c3836]">
            <p className="text-lg font-arabic text-[#fe8019] text-right leading-loose">{reflection.arabic}</p>
          </div>

          {/* Reflection Text */}
          <p className="text-[#ebdbb2] leading-relaxed mb-4 line-clamp-3">{reflection.reflection}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {reflection.tags.map((tag) => (
              <Badge key={tag} className="bg-[#fe8019]/20 text-[#fe8019] text-xs hover:bg-[#fe8019]/30 cursor-pointer">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ReflectionsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("date")
  const [filteredReflections, setFilteredReflections] = useState(reflections)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort reflections
  useEffect(() => {
    const filtered = reflections.filter((reflection) => {
      const matchesSearch =
        searchQuery === "" ||
        reflection.reflection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reflection.verse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reflection.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesMood = !selectedMood || reflection.mood === selectedMood
      const matchesTag = !selectedTag || reflection.tags.includes(selectedTag)

      return matchesSearch && matchesMood && matchesTag
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "verse":
          return a.verse.localeCompare(b.verse)
        case "favorite":
          return b.favorite ? 1 : -1
        default:
          return 0
      }
    })

    setFilteredReflections(filtered)
  }, [searchQuery, selectedMood, selectedTag, sortBy])

  const handleEdit = (id: number) => {
    // Edit reflection logic
    console.log("Edit reflection", id)
  }

  const handleDelete = (id: number) => {
    // Delete reflection logic
    console.log("Delete reflection", id)
  }

  const handleShare = (id: number) => {
    // Share reflection logic
    console.log("Share reflection", id)
  }

  const handleViewVerse = (surahId: number, ayahId: number) => {
    router.push(`/dashboard/guidance/ayah/${surahId}/${ayahId}`)
  }

  const allTags = Array.from(new Set(reflections.flatMap((r) => r.tags)))
  const allMoods = Array.from(new Set(reflections.map((r) => r.mood)))

  if (isLoading) {
    return <Loading fullScreen text="Loading your reflections..." />
  }

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#fe8019] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-[#3c3836]">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <h1 className="text-xl font-bold">My Reflections</h1>
            <p className="text-sm text-[#a89984]">{filteredReflections.length} reflections</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/guidance")}
            className="text-[#a89984] hover:text-[#ebdbb2]"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="relative z-10 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
          <Input
            placeholder="Search reflections, verses, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedMood ? "outline" : "default"}
            size="sm"
            onClick={() => setSelectedMood(null)}
            className={selectedMood ? "border-[#3c3836] text-[#a89984]" : "bg-[#fe8019] text-[#1d2021]"}
          >
            All Moods
          </Button>
          {allMoods.map((mood) => (
            <Button
              key={mood}
              variant={selectedMood === mood ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
              className={
                selectedMood === mood ? "text-[#1d2021]" : "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
              }
              style={{
                backgroundColor: selectedMood === mood ? moodColors[mood as keyof typeof moodColors] : undefined,
              }}
            >
              <div
                className="h-2 w-2 rounded-full mr-2"
                style={{ backgroundColor: moodColors[mood as keyof typeof moodColors] }}
              />
              {mood}
            </Button>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 8).map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={
                selectedTag === tag
                  ? "bg-[#fe8019] text-[#1d2021]"
                  : "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
              }
            >
              #{tag}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SortDesc className="h-4 w-4 text-[#a89984]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#282828] border border-[#3c3836] text-[#ebdbb2] rounded px-3 py-1 text-sm"
          >
            <option value="date">Sort by Date</option>
            <option value="verse">Sort by Verse</option>
            <option value="favorite">Sort by Favorite</option>
          </select>
        </div>
      </div>

      {/* Reflections Grid */}
      <div className="relative z-10 p-4">
        {filteredReflections.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-[#a89984] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#ebdbb2] mb-2">No reflections found</h3>
            <p className="text-[#a89984] mb-4">Try adjusting your search or filters</p>
            <Button
              onClick={() => router.push("/dashboard/guidance")}
              className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            >
              Start Reflecting
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReflections.map((reflection, index) => (
              <motion.div
                key={reflection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReflectionCard
                  reflection={reflection}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onShare={handleShare}
                  onViewVerse={handleViewVerse}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
