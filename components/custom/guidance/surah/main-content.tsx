"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Search,
  Bookmark,
  ArrowLeft,
  Headphones,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SurahsPageContent = ({ surahs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("number");
  const router = useRouter();

  const filteredSurahs = surahs
    .filter((surah) => {
      const matchesSearch =
        surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        surah.arabicName.includes(searchTerm);

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "bookmarked" && surah.isBookmarked) ||
        (filterBy === "in-progress" &&
          surah.readingProgress > 0 &&
          surah.readingProgress < 100) ||
        (filterBy === "completed" && surah.readingProgress === 100) ||
        (filterBy === "not-started" && surah.readingProgress === 0);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "progress":
          return b.readingProgress - a.readingProgress;
        case "verses":
          return a.verses - b.verses;
        default:
          return a.id - b.id;
      }
    });

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2]">
      {/* Header */}
      <div
        className={`sticky top-0 z-10 ${"bg-[#1d2021] border-b border-[#3c3836]"}`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${"text-[#a89984 absolute hover:text-[#ebdbb2] hover:bg-[#3c3836]"}`}
            onClick={() => router.push("/dashboard/guidance")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex flex-col items-center mx-auto">
            <h1 className={`text-lg font-medium ${"text-[#ebdbb2]"}`}>
              Quran Reading
            </h1>
            <p className={`text-xs ${"text-[#a89984]"}`}>
              Read and Study the Whole Quran
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-[#282828] rounded-lg p-6 border border-[#3c3836] mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
              <Input
                placeholder="Search surahs"
                className="pl-10 bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select
                defaultValue="all"
                value={filterBy}
                onValueChange={setFilterBy}
              >
                <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                  <SelectItem value="all">All Surahs</SelectItem>
                  <SelectItem value="bookmarked">Bookmarked</SelectItem>
                  <SelectItem value="in-progress">Reading</SelectItem>
                  <SelectItem value="not-started">Not started</SelectItem>
                </SelectContent>
              </Select>

              <Select
                defaultValue=""
                value={sortBy}
                onValueChange={(e) => setSortBy(e)}
              >
                <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                  <SelectItem value="number">By Number</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                  <SelectItem value="verses">By Length</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSurahs.map((surah, index) => (
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              key={index}
              className="cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/guidance/surah/${surah.id}`)
              }
            >
              <Card className="bg-[#282828] border-[#3c3836] hover:border-[#504945] transition-all duration-300 overflow-hidden relative group">
                <CardContent>
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Left side - Surah info */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#3c3836] flex items-center justify-center text-[#ebdbb2] font-bold text-sm sm:text-base flex-shrink-0">
                        {surah.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[#ebdbb2] font-semibold text-base sm:text-lg truncate">
                          {surah.name}
                        </h3>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[#a89984] flex-wrap">
                          <span>{surah.verses} verses</span>
                          <span className="xs:inline">•</span>
                          <span className="">{surah.revelation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Arabic name and difficulty */}
                    <div className="flex items-center justify-between sm:justify-end sm:text-right gap-3">
                      <p className="text-xl sm:text-2xl text-[#fe8019] font-arabic">
                        {surah.arabicName}
                      </p>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <AnimatePresence>
                    {window.innerWidth < 640 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex gap-2"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] text-xs sm:text-sm px-2 sm:px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/dashboard/guidance/surah/${surah.id}`
                            );
                          }}
                        >
                          <Headphones className="h-3 w-3 sm:mr-1" />
                          <span className="hidden xs:inline ml-1">Listen</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-[#3c3836] text-[#a89984] hover:bg-[#3c3836] text-xs sm:text-sm px-2 sm:px-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/dashboard/guidance/audio/${surah.id}`
                            );
                          }}
                        >
                          <Bookmark className="h-3 w-3 sm:mr-1" />
                          <span className="hidden xs:inline ml-1">Save</span>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-[#a89984] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#ebdbb2] mb-2">
              No surahs found
            </h3>
            <p className="text-[#a89984]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurahsPageContent;
