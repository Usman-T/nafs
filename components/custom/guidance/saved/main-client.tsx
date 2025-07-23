"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, SortDesc, Plus } from "lucide-react";
import SavedVerseCard from "./saved-ayah-card";
import { SavedAyah } from "@prisma/client";
import { deleteAyah } from "@/lib/actions/manage-guidance";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SavedAyahClientPage({
  savedVerses,
}: {
  savedVerses: SavedAyah[];
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filteredVerses, setFilteredVerses] = useState(savedVerses);

  useEffect(() => {
    const filtered = savedVerses.filter((verse) => {
      const query = searchQuery.toLowerCase();
      return (
        verse.translation.toLowerCase().includes(query) ||
        verse.surahName.toLowerCase().includes(query) ||
        verse.arabic.includes(query)
      );
    });

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "surah") {
        const [sA, aA] = b.verseKey.split(":").map(Number);
        const [sB, aB] = a.verseKey.split(":").map(Number);
        return sB - sA || aB - aA;
      }
      return 0;
    });

    setFilteredVerses(filtered);
  }, [searchQuery, sortBy, savedVerses]);

  const handleView = (surahId: number, ayahId: number) => {
    router.push(`/dashboard/guidance/ayah/${surahId}/${ayahId}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAyah(id);
      toast.success("Removed from saved verses");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ayah");
    }
  };

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] relative overflow-hidden">
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
            <p className="text-sm text-[#a89984]">
              {filteredVerses.length} verses saved
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard/guidance/surah")}
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
            placeholder="Search verses or surahs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#282828] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
          />
        </div>

        <div className="flex items-center justify-end">
          <SortDesc className="h-4 w-4 text-[#a89984]" />
          <Select
            onValueChange={(e) => setSortBy(e)}
            value={sortBy}
            defaultValue="en"
          >
            {" "}
            <SelectTrigger className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] w-full md:w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
              <SelectItem value="surah">Sort By Date</SelectItem>
              <SelectItem value="date">Sort By Surah</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative z-10 p-4">
        {filteredVerses.length === 0 ? (
          <div className="text-center py-12 text-[#a89984]">
            No saved verses found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerses.map((verse, index) => {
              const surahId = verse.verseKey.substring(
                6,
                verse.verseKey.indexOf(",")
              ); // "Surah X, Ayah X"
              const ayahId = verse.verseKey.substring(
                verse.verseKey.lastIndexOf(" "),
                verse.verseKey.length
              ); // ""

              return (
                <motion.div
                  key={verse.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SavedVerseCard
                    verse={verse}
                    onView={() =>
                      handleView(parseInt(surahId), parseInt(ayahId))
                    }
                    onDelete={handleDelete}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
