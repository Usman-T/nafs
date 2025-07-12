"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Share2,
  Plus,
  Minus,
  Eye,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const reciters = [
  { id: 1, name: "Mishary Rashid Alafasy", language: "Arabic" },
  { id: 2, name: "Abdul Rahman Al-Sudais", language: "Arabic" },
  { id: 3, name: "Saud Al-Shuraim", language: "Arabic" },
  { id: 4, name: "Abu Bakr Al-Shatri", language: "Arabic" },
  { id: 5, name: "Hani Ar-Rifai", language: "Arabic" },
];

const translations = [
  { id: 1, name: "Sahih International", language: "English" },
  { id: 2, name: "Pickthall", language: "English" },
  { id: 3, name: "Yusuf Ali", language: "English" },
  { id: 4, name: "Dr. Mustafa Khattab", language: "English" },
  { id: 5, name: "Mufti Taqi Usmani", language: "English" },
];

const SettingsPanel = ({
  fontSize,
  onFontSizeChange,
  showWordByWord,
  onToggleWordByWord,
  selectedReciter,
  onReciterChange,
  selectedTranslation,
  onTranslationChange,
  settingsButtonRef,
}: {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  showWordByWord: boolean;
  onToggleWordByWord: () => void;
  selectedReciter: number;
  onReciterChange: (id: number) => void;
  selectedTranslation: number;
  onTranslationChange: (id: number) => void;
  settingsButtonRef: any;
}) => {
  return (
    <Sheet>
      <SheetTrigger ref={settingsButtonRef} asChild>
        <div></div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-[#1d2021] text-[#ebdbb2] border-l border-[#3c3836]">
        <SheetHeader>
          <SheetTitle className="text-[#ebdbb2]">Settings</SheetTitle>
          <SheetDescription className="text-[#a89984]">
            Customize the Quran reader to your liking
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-6 py-4">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[#ebdbb2]">Font Size</Label>
              <span className="text-sm text-[#a89984]">{fontSize}px</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                onClick={() => onFontSizeChange(Math.max(14, fontSize - 2))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Slider
                defaultValue={[fontSize]}
                min={14}
                max={32}
                step={2}
                value={[fontSize]}
                onValueChange={(value) => onFontSizeChange(value[0])}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                onClick={() => onFontSizeChange(Math.min(32, fontSize + 2))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Word by Word */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#ebdbb2]" />
              <Label className="text-[#ebdbb2]">Word by Word</Label>
            </div>
            <Switch
              checked={showWordByWord}
              onCheckedChange={onToggleWordByWord}
            />
          </div>

          {/* Reciter */}
          <div className="space-y-2">
            <Label className="text-sm text-[#ebdbb2]">Reciter</Label>
            <Select
              value={String(selectedReciter)}
              onValueChange={(val) => onReciterChange(Number(val))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Reciter" />
              </SelectTrigger>
              <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                {reciters.map((reciter) => (
                  <SelectItem
                    key={reciter.id}
                    value={String(reciter.id)}
                    className="cursor-pointer"
                  >
                    {reciter.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Translation */}
          <div className="space-y-2">
            <Label className="text-sm text-[#ebdbb2]">Translation Source</Label>
            <Select
              value={String(selectedTranslation)}
              onValueChange={(val) => onTranslationChange(Number(val))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Translation" />
              </SelectTrigger>
              <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                {translations.map((translation) => (
                  <SelectItem
                    key={translation.id}
                    value={String(translation.id)}
                    className="cursor-pointer"
                  >
                    {translation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div>
            <Label className="text-sm text-[#ebdbb2]">Actions</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button
                onClick={() => onFontSizeChange(20)}
                variant="outline"
                className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              >
                <span className="mr-2">↺</span> Reset
              </Button>
              <Button
                variant="outline"
                className="border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;
