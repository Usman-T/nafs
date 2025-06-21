"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Search, Bookmark, SortDesc, Share2, Trash2, Heart, Play, Eye, Plus } from "lucide-react"
import Loading from "@/components/ui/loading"

// Sample saved verses data
const savedVerses = [
  {
    id: 1,
    surahId: 1,
    ayahId: 1,
    surahName: "Al-Fatihah",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    savedDate: "2024-01-15",
    tags: ["barakah", "beginning"],
    category: "daily-recitation",
    favorite: true,
    hasReflection: true,
    hasAudio: true,
  },
  {
    id: 2,
    surahId: 1,
    ayahId: 2,
    surahName: "Al-Fatihah",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    savedDate: "2024-01-14",
    tags: ["gratitude", "praise"],
    category: "gratitude",
    favorite: false,
    hasReflection: true,
    hasAudio: true,
  },
  {
    id: 3,
    surahId: 1,
    ayahId: 5,
    surahName: "Al-Fatihah",
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    savedDate: "2024-01-13",
    tags: ["worship", "help"],
    category: "worship",
    favorite: true,
    hasReflection: false,
    hasAudio: true,
  },
  {
    id: 4,
    surahId: 1,
    ayahId: 6,
    surahName: "Al-Fatihah",
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    savedDate: "2024-01-12",
    tags: ["guidance", "dua"],
    category: "dua",
    favorite: false,
    hasReflection: true,
    hasAudio: true,
  },
]

const categories = [
  { id: "all", name: "All Verses", color: "#fe8019" },
  { id: "daily-recitation", name: "Daily Recitation", color: "#8ec07c" },
  { id: "gratitude", name: "Gratitude", color: "#fabd2f" },
  { id: "worship", name: "Worship", color: "#83a598" },
  { id: "dua", name: "Duas", color: "#d3869b" },
]

const SavedVerseCard = ({
  verse,
  onView,
  onDelete,
  onShare,
  onToggleFavorite,
}: {
  verse: (typeof savedVerses)[0]
  onView: (surahId: number, ayahId: number) => void
  onDelete: (id: number) => void
  onShare: (id: number) => void
  onToggleFavorite: (id: number) => void
}) => {
  const categoryColor = categories.find((c) => c.id === verse.category)?.color || "#fe8019"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="cursor-pointer"
      onClick={() => onView(verse.surahId, verse.ayahId)}
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden relative group">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryColor }} />
              <div>
                <Badge className="bg-[#3c3836] text-[#a89984]">
                  {verse.surahName} {verse.ayahId}
                </Badge>
                <p className="text-xs text-[#a89984] mt-1">
                  Saved{" "}
                  {new Date(verse.savedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2]"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(verse.id)
                }}
              >
                <Heart className={`h-4 w-4 ${verse.favorite ? "fill-current text-[#d3869b]" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2]"
                onClick={(e) => {
                  e.stopPropagation()
                  onShare(verse.id)
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(verse.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Arabic Text */}
          <div className="mb-4 p-4 rounded-lg bg-[#1d2021] border border-[#3c3836]">
            <p className="text-xl font-arabic text-[#fe8019] text-right leading-loose mb-2">{verse.arabic}</p>
            <p className="text-[#ebdbb2] text-sm italic">"{verse.translation}"</p>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {verse.hasAudio && (
                <Badge className="bg-[#8ec07c]/20 text-[#8ec07c] text-xs">
                  <Play className="h-3 w-3 mr-1" />
                  Audio
                </Badge>
              )}
              {verse.hasReflection && (
                <Badge className="bg-[#83a598]/20 text-[#83a598] text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Reflection
                </Badge>
              )}
            </div>

            <Badge
              className="text-xs"
              style={{
                backgroundColor: `${categoryColor}20`,
                color: categoryColor,
              }}
            >
              {categories.find((c) => c.id === verse.category)?.name}
            </Badge>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {verse.tags.map((tag) => (
              <Badge key={tag} className="bg-[#fe8019]/20 text-[#fe8019] text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function SavedVersesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [filteredVerses, setFilteredVerses] = useState(savedVerses)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort verses
  useEffect(() => {
    const filtered = savedVerses.filter((verse) => {
      const matchesSearch =
        searchQuery === "" ||
        verse.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verse.surahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        verse.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || verse.category === selectedCategory
      const matchesFavorites = !showFavoritesOnly || verse.favorite

      return matchesSearch && matchesCategory && matchesFavorites
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
        case "surah":
          return a.surahId - b.surahId || a.ayahId - b.ayahId
        case "favorite":
          return b.favorite ? 1 : -1
        default:
          return 0
      }
    })

    setFilteredVerses(filtered)
  }, [searchQuery, selectedCategory, sortBy, showFavoritesOnly])

  const handleView = (surahId: number, ayahId: number) => {
    router.push(`/dashboard/guidance/ayah/${surahId}/${ayahId}`)
  }

  const handleDelete = (id: number) => {
    // Delete verse logic
    console.log("Delete verse", id)
  }

  const handleShare = (id: number) => {
    // Share verse logic
    console.log("Share verse", id)
  }

  const handleToggleFavorite = (id: number) => {
    // Toggle favorite logic
    console.log("Toggle favorite", id)
  }

  if (isLoading) {
    return <Loading fullScreen text="Loading saved verses..." />
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
            <h1 className="text-xl font-bold">Saved Verses</h1>
            <p className="text-sm text-[#a89984]">{filteredVerses.length} verses saved</p>
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
            placeholder="Search verses, surahs, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "text-[#1d2021]"
                  : "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
              }
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : undefined,
              }}
            >
              <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: category.color }} />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={
                showFavoritesOnly
                  ? "bg-[#d3869b] text-[#1d2021]"
                  : "border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
              }
            >
              <Heart className={`h-4 w-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`} />
              Favorites Only
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <SortDesc className="h-4 w-4 text-[#a89984]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#282828] border border-[#3c3836] text-[#ebdbb2] rounded px-3 py-1 text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="surah">Sort by Surah</option>
              <option value="favorite">Sort by Favorite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verses Grid */}
      <div className="relative z-10 p-4">
        {filteredVerses.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-[#a89984] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#ebdbb2] mb-2">No saved verses found</h3>
            <p className="text-[#a89984] mb-4">Try adjusting your search or filters</p>
            <Button
              onClick={() => router.push("/dashboard/guidance")}
              className="bg-[#fe8019] text-[#1d2021] hover:bg-[#fe8019]/90"
            >
              Explore Quran
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerses.map((verse, index) => (
              <motion.div
                key={verse.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SavedVerseCard
                  verse={verse}
                  onView={handleView}
                  onDelete={handleDelete}
                  onShare={handleShare}
                  onToggleFavorite={handleToggleFavorite}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
