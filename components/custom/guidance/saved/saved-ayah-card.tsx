// app/dashboard/guidance/saved/saved-ayah-card.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Trash2 } from "lucide-react";

const SavedVerseCard = ({
  verse,
  onView,
  onDelete,
  onShare,
}: {
  verse: {
    id: string;
    verseKey: string;
    surahName: string;
    arabic: string;
    translation: string;
    createdAt: string;
  };
  onView: () => void;
  onDelete: (id: string) => void;
  onShare: (id: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="cursor-pointer"
      onClick={onView}
    >
      <Card className="bg-[#282828] border-[#3c3836] overflow-hidden relative group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="bg-[#3c3836] text-[#a89984]">
                {verse.surahName} ({verse.verseKey})
              </Badge>
              <p className="text-xs text-[#a89984] mt-1">
                Saved{" "}
                {new Date(verse.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-[#ebdbb2]"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(verse.id);
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-[#a89984] hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(verse.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mb-4 p-4 rounded-lg bg-[#1d2021] border border-[#3c3836]">
            <p className="text-xl font-arabic text-[#fe8019] text-right leading-loose mb-2">
              {verse.arabic}
            </p>
            <p className="text-[#ebdbb2] text-sm italic">"{verse.translation}"</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SavedVerseCard;
