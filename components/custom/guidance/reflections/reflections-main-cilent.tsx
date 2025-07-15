"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Search,
  MessageSquare,
  Heart,
  SortDesc,
  Edit3,
  Trash2,
  Share2,
  Plus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Reflection = {
  id: string;
  userId: string;
  arabic: string;
  reflectionText: string;
  verseKey: string;
  favourite: boolean;
  createdAt: string;
};

export default function ReflectionsPageClient({
  reflections,
}: {
  reflections: Reflection[];
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filteredReflections, setFilteredReflections] = useState(reflections);

  useEffect(() => {
    const filtered = reflections.filter((reflection) => {
      const q = searchQuery.toLowerCase();
      return (
        reflection.arabic.includes(q) ||
        reflection.reflectionText.toLowerCase().includes(q) ||
        reflection.verseKey.toLowerCase().includes(q)
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "verse":
          return a.verseKey.localeCompare(b.verseKey);
        case "favourite":
          return b.favourite ? 1 : -1;
        default:
          return 0;
      }
    });

    setFilteredReflections(filtered);
  }, [searchQuery, sortBy, reflections]);

  const handleViewVerse = (verseKey: string) => {
    const [surahId, ayahId] = verseKey.split(":").map(Number);
    router.push(`/dashboard/guidance/ayah/${surahId}/${ayahId}`);
  };

  const handleEdit = (id: string) => console.log("Edit", id);
  const handleDelete = (id: string) => console.log("Delete", id);
  const handleShare = (id: string) => console.log("Share", id);

  return (
    <>
      <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#fe8019] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

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
              <p className="text-sm text-[#a89984]">
                {filteredReflections.length} reflections
              </p>
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

        <div className="relative z-10 p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#a89984]" />
            <Input
              placeholder="Search reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
            />
          </div>

          <div className="flex items-center gap-2">
            <SortDesc className="h-4 w-4 text-[#a89984]" />
            <Select value={sortBy} defaultValue="en">
              {" "}
              <SelectTrigger
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="verse">Sort by Verse</SelectItem>
                <SelectItem value="favourite">Sort by Favourite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative z-10 p-4">
          {filteredReflections.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-[#a89984] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#ebdbb2] mb-2">
                No reflections found
              </h3>
              <p className="text-[#a89984] mb-4">
                Try adjusting your search or filters
              </p>
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
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-[#282828] border-[#3c3836] overflow-hidden relative group">
                    <CardContent className="">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#fe8019] hover:text-[#fabd2f] p-0"
                            onClick={() => handleViewVerse(reflection.verseKey)}
                          >
                            {reflection.verseKey}
                          </Button>
                          <p className="text-xs text-[#a89984]">
                            {new Date(reflection.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {reflection.favourite && (
                            <Heart className="h-4 w-4 text-[#d3869b] fill-current" />
                          )}
                          <Edit3
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => handleEdit(reflection.id)}
                          />
                          <Share2
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => handleShare(reflection.id)}
                          />
                          <Trash2
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => handleDelete(reflection.id)}
                          />
                        </div>
                      </div>

                      <div className="mb-4 p-3 rounded-lg bg-[#1d2021] border border-[#3c3836]">
                        <p className="text-lg font-arabic text-[#fe8019] text-right leading-loose">
                          {reflection.arabic}
                        </p>
                      </div>

                      <p className="text-[#ebdbb2] leading-relaxed">
                        {reflection.reflectionText}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
