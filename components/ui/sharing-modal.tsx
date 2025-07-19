"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  X,
  Copy,
  Check,
  Share2,
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
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

export default function SharingModal({ isOpen, onClose, content }: SharingModalProps) {
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      localStorage.setItem("nafs-hide-mobile-nav", "true");
      window.dispatchEvent(new Event("storage"));
    }
  }, [isOpen]);

  const shareText = `${content.arabic}\n\n\"${content.translation}\"\n\n- ${content.reference}\n\n${customMessage}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const autoShare = (platform: string) => {
    const encoded = encodeURIComponent(shareText);
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=&quote=${encoded}`,
      whatsapp: `https://wa.me/?text=${encoded}`,
      email: `mailto:?subject=Quranic Inspiration&body=${encoded}`,
    };
    const url = urls[platform];
    if (url) window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center h-screen bg-black/70 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#282828] rounded-xl border border-[#3c3836] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#3c3836]">
              <h2 className="text-xl font-semibold text-[#ebdbb2] flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-[#fe8019]" /> Share
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              <Card className="bg-[#1d2021] border-[#3c3836] max-h-60 overflow-y-auto">
                <CardContent className="p-6 space-y-4">
                  <p className="text-xl font-arabic text-[#fe8019] text-right leading-loose whitespace-pre-line">
                    {content.arabic}
                  </p>
                  <p className="text-[#ebdbb2] italic">"{content.translation}"</p>
                  <p className="text-[#a89984] font-medium">- {content.reference}</p>
                  {customMessage && (
                    <p className="text-[#a89984] text-sm pt-4 whitespace-pre-line">{customMessage}</p>
                  )}
                </CardContent>
              </Card>

              <Textarea
                placeholder="Add a message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]"
              />

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={handleCopy} className="col-span-2 bg-[#8ec07c] text-[#1d2021]">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Text"}
                </Button>

                <Button onClick={() => autoShare("twitter")} variant="outline">
                  <Twitter className="h-4 w-4 mr-2" /> Twitter
                </Button>
                <Button onClick={() => autoShare("facebook")} variant="outline">
                  <Facebook className="h-4 w-4 mr-2" /> Facebook
                </Button>
                <Button onClick={() => autoShare("whatsapp")} variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </Button>
                <Button onClick={() => autoShare("email")} variant="outline">
                  <Mail className="h-4 w-4 mr-2" /> Email
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
