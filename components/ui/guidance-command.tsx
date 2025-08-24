"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  Scroll,
  MessageSquare,
  Clock,
  ArrowRight,
  Command,
  Quote,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const typeConfig = {
  surah: { label: "Surahs", color: "#fe8019", icon: BookOpen },
  verse: { label: "Verses", color: "#fabd2f", icon: Quote },
  topic: { label: "Topics", color: "#8ec07c", icon: MessageSquare },
  tafsir: { label: "Tafsir", color: "#83a598", icon: Scroll },
  recent: { label: "Recent", color: "#d3869b", icon: Clock },
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  searchData: any[];
}

export default function CommandPalette({
  isOpen,
  onClose,
  searchData,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredResults, setFilteredResults] = useState(searchData);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Filter results based on query
  useEffect(() => {
    if (query.trim() === "") {
      // Show recent items when no query
      setFilteredResults(
        searchData
          .filter((item) => item.type === "recent")
          .concat(
            searchData.filter((item) => item.type !== "recent").slice(0, 8)
          )
      );
    } else {
      const filtered = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered);
    }
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (item: (typeof searchData)[0]) => {
    router.push(item.route);
    onClose();
    setQuery("");
  };

  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, typeof searchData>);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 h-screen backdrop-blur-sm"
        onClick={onClose}
      >
        <div className="flex items-start justify-center pt-[10vh] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-[#282828] rounded-xl border border-[#3c3836] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-[#3c3836]">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-5 w-5 text-[#a89984]" />
                <Input
                  ref={inputRef}
                  placeholder="Search Quran, verses, topics, tafsir..."
                  className="border-0 bg-transparent text-[#ebdbb2] placeholder:text-[#a89984] focus-visible:ring-0 text-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#3c3836] text-[#a89984] text-xs">
                  <Command className="h-3 w-3 mr-1" />K
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {filteredResults.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-[#504945] mx-auto mb-4" />
                  <p className="text-[#a89984] mb-2">No results found</p>
                  <p className="text-sm text-[#504945]">
                    Try searching for surahs, verses, or topics
                  </p>
                </div>
              ) : (
                <div className="p-2">
                  {Object.entries(groupedResults).map(([type, items]) => {
                    const config = typeConfig[type as keyof typeof typeConfig];
                    return (
                      <div key={type} className="mb-4 last:mb-0">
                        <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#a89984] uppercase tracking-wider">
                          <config.icon className="h-3 w-3" />
                          {config.label}
                        </div>
                        <div className="space-y-1">
                          {items.map((item, index) => {
                            const globalIndex = filteredResults.indexOf(item);
                            const isSelected = globalIndex === selectedIndex;
                            const ItemIcon = item.icon;

                            return (
                              <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                  isSelected
                                    ? "bg-[#3c3836] border border-[#fe8019]"
                                    : "hover:bg-[#3c3836] border border-transparent"
                                }`}
                                onClick={() => handleSelect(item)}
                              >
                                <div
                                  className="h-8 w-8 rounded-full flex items-center justify-center"
                                  style={{
                                    backgroundColor: config.color + "20",
                                  }}
                                >
                                  <ItemIcon
                                    className="h-4 w-4"
                                    style={{ color: config.color }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[#ebdbb2] font-medium truncate">
                                    {item.title}
                                  </p>
                                  <p className="text-sm text-[#a89984] truncate">
                                    {item.subtitle}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {item.type === "recent" && (
                                    <Badge className="bg-[#504945] text-[#a89984] text-xs">
                                      Recent
                                    </Badge>
                                  )}
                                  <ArrowRight className="h-4 w-4 text-[#504945]" />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-3 border-t border-[#3c3836] bg-[#1d2021]">
              <div className="text-xs text-[#ebddb2]">
                {filteredResults.length} result
                {filteredResults.length !== 1 ? "s" : ""}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
