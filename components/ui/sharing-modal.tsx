"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  Copy,
  Check,
  Share2,
  Download,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  ImageIcon,
  Palette,
  Type,
  Sparkles,
} from "lucide-react";

interface SharingModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    arabic: string;
    translation: string;
    reference: string;
    type: "verse" | "reflection" | "surah";
  };
}

const backgroundStyles = [
  {
    id: 1,
    name: "Gradient",
    bg: "linear-gradient(135deg, #fe8019 0%, #fabd2f 100%)",
  },
  {
    id: 2,
    name: "Islamic",
    bg: "linear-gradient(135deg, #8ec07c 0%, #83a598 100%)",
  },
  {
    id: 3,
    name: "Night",
    bg: "linear-gradient(135deg, #1d2021 0%, #282828 100%)",
  },
  {
    id: 4,
    name: "Elegant",
    bg: "linear-gradient(135deg, #d3869b 0%, #fe8019 100%)",
  },
];

const fontStyles = [
  { id: 1, name: "Classic", font: "font-serif" },
  { id: 2, name: "Modern", font: "font-sans" },
  { id: 3, name: "Arabic", font: "font-arabic" },
  { id: 4, name: "Elegant", font: "font-mono" },
];

export default function SharingModal({
  isOpen,
  onClose,
  content,
}: SharingModalProps) {
  const [selectedBackground, setSelectedBackground] = useState(1);
  const [selectedFont, setSelectedFont] = useState(1);
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareFormat, setShareFormat] = useState<"text" | "image">("text");

  localStorage.setItem("nafs-hide-mobile-nav", "true");
  const handleCopy = () => {
    const shareText = `${content.arabic}\n\n"${content.translation}"\n\n- ${content.reference}\n\n${customMessage}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const shareText = `${content.arabic}\n\n"${content.translation}"\n\n- ${content.reference}\n\n${customMessage}`;
    const encodedText = encodeURIComponent(shareText);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      email: `mailto:?subject=Beautiful Quran Verse&body=${encodedText}`,
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], "_blank");
    }
  };

  const selectedBg = backgroundStyles.find(
    (bg) => bg.id === selectedBackground
  );
  const selectedFontStyle = fontStyles.find((font) => font.id === selectedFont);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#282828] rounded-xl border border-[#3c3836] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#3c3836]">
              <h2 className="text-xl font-semibold text-[#ebdbb2] flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-[#fe8019]" />
                Share {content.type}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 grid lg:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-[#ebdbb2]">Preview</h3>

                {/* Format Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={shareFormat === "text" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShareFormat("text")}
                    className={
                      shareFormat === "text"
                        ? "bg-[#fe8019] text-[#1d2021]"
                        : "border-[#3c3836] text-[#a89984]"
                    }
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button
                    variant={shareFormat === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShareFormat("image")}
                    className={
                      shareFormat === "image"
                        ? "bg-[#fe8019] text-[#1d2021]"
                        : "border-[#3c3836] text-[#a89984]"
                    }
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </Button>
                </div>

                {/* Preview Card */}
                {shareFormat === "image" ? (
                  <Card
                    className="relative overflow-hidden border-[#3c3836] aspect-square"
                    style={{ background: selectedBg?.bg }}
                  >
                    <CardContent className="p-8 h-full flex flex-col justify-center text-center relative">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative z-10 space-y-6">
                        <div className="space-y-4">
                          <p
                            className={`text-2xl text-white leading-loose ${selectedFontStyle?.font}`}
                          >
                            {content.arabic}
                          </p>
                          <p className="text-lg text-white/90 italic">
                            "{content.translation}"
                          </p>
                          <p className="text-white/80 font-medium">
                            - {content.reference}
                          </p>
                        </div>
                        {customMessage && (
                          <p className="text-white/70 text-sm border-t border-white/20 pt-4">
                            {customMessage}
                          </p>
                        )}
                        <div className="flex items-center justify-center">
                          <Sparkles className="h-4 w-4 text-white/60" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-[#1d2021] border-[#3c3836]">
                    <CardContent className="p-6 space-y-4">
                      <p className="text-xl font-arabic text-[#fe8019] text-right leading-loose">
                        {content.arabic}
                      </p>
                      <p className="text-[#ebdbb2] italic">
                        "{content.translation}"
                      </p>
                      <p className="text-[#a89984] font-medium">
                        - {content.reference}
                      </p>
                      {customMessage && (
                        <p className="text-[#a89984] text-sm border-t border-[#3c3836] pt-4">
                          {customMessage}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Customization */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-[#ebdbb2]">
                  Customize
                </h3>

                {/* Custom Message */}
                <div>
                  <label className="text-sm font-medium text-[#a89984] mb-2 block">
                    Add Personal Message
                  </label>
                  <Textarea
                    placeholder="Share your thoughts or add context..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2] placeholder:text-[#a89984]"
                  />
                </div>

                {/* Background Styles (for image format) */}
                {shareFormat === "image" && (
                  <div>
                    <label className="text-sm font-medium text-[#a89984] mb-3 block flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      Background Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {backgroundStyles.map((bg) => (
                        <motion.div
                          key={bg.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`h-16 rounded-lg cursor-pointer border-2 ${
                            selectedBackground === bg.id
                              ? "border-[#fe8019]"
                              : "border-[#3c3836]"
                          }`}
                          style={{ background: bg.bg }}
                          onClick={() => setSelectedBackground(bg.id)}
                        >
                          <div className="h-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded">
                              {bg.name}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Font Styles (for image format) */}
                {shareFormat === "image" && (
                  <div>
                    <label className="text-sm font-medium text-[#a89984] mb-3 block flex items-center">
                      <Type className="h-4 w-4 mr-2" />
                      Font Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {fontStyles.map((font) => (
                        <Button
                          key={font.id}
                          variant={
                            selectedFont === font.id ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedFont(font.id)}
                          className={
                            selectedFont === font.id
                              ? "bg-[#fe8019] text-[#1d2021]"
                              : "border-[#3c3836] text-[#a89984]"
                          }
                        >
                          {font.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Actions */}
                <div>
                  <label className="text-sm font-medium text-[#a89984] mb-3 block">
                    Share Options
                  </label>

                  {/* Copy Link */}
                  <div className="mb-4">
                    <Button
                      onClick={handleCopy}
                      className="w-full bg-[#8ec07c] text-[#1d2021] hover:bg-[#8ec07c]/90"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copied ? "Copied!" : "Copy Text"}
                    </Button>
                  </div>

                  {/* Social Platforms */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                      className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                      className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("whatsapp")}
                      className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare("email")}
                      className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>

                  {/* Download Image */}
                  {shareFormat === "image" && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        className="w-full border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2]"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
