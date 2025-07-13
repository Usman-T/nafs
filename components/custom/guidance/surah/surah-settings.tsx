"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Share2, Plus, Minus, Eye } from "lucide-react";
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
import { useSurah } from "@/lib/context/surah-page-context";

const reciters = [
  { id: 1, name: "Mishary Rashid Alafasy" },
  { id: 2, name: "Abdul Rahman Al-Sudais" },
  { id: 3, name: "Saud Al-Shuraim" },
  { id: 4, name: "Abu Bakr Al-Shatri" },
  { id: 5, name: "Hani Ar-Rifai" },
];

const translations = [
  { id: 1, name: "Sahih International" },
  { id: 2, name: "Pickthall" },
  { id: 3, name: "Yusuf Ali" },
  { id: 4, name: "Dr. Mustafa Khattab" },
  { id: 5, name: "Mufti Taqi Usmani" },
];

export default function SettingsPanel() {
  const { state, dispatch, refs } = useSurah();

  return (
    <Sheet>
      <SheetTrigger ref={refs.settingsButtonRef} asChild>
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
          {/* Font Size Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[#ebdbb2]">Font Size</Label>
              <span className="text-sm text-[#a89984]">{state.fontSize}px</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                onClick={() =>
                  dispatch({
                    type: "SET_FONT_SIZE",
                    payload: Math.max(14, state.fontSize - 2),
                  })
                }
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Slider
                min={14}
                max={32}
                step={2}
                value={[state.fontSize]}
                onValueChange={(v) =>
                  dispatch({ type: "SET_FONT_SIZE", payload: v[0] })
                }
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 border-[#3c3836] text-[#a89984] hover:text-[#ebdbb2] hover:bg-[#3c3836]"
                onClick={() =>
                  dispatch({
                    type: "SET_FONT_SIZE",
                    payload: Math.min(32, state.fontSize + 2),
                  })
                }
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
              checked={state.showWordByWord}
              onCheckedChange={(checked) =>
                dispatch({ type: "SET_WORD_BY_WORD", payload: checked })
              }
            />
          </div>

          {/* Reciter Selection */}
          <div className="space-y-2">
            <Label className="text-sm text-[#ebdbb2]">Reciter</Label>
            <Select
              value={String(state.selectedReciter)}
              onValueChange={(value) =>
                dispatch({ type: "SET_RECITER", payload: Number(value) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Reciter" />
              </SelectTrigger>
              <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                {reciters.map((r) => (
                  <SelectItem
                    key={r.id}
                    value={String(r.id)}
                    className="cursor-pointer"
                  >
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Translation Selection */}
          <div className="space-y-2">
            <Label className="text-sm text-[#ebdbb2]">Translation Source</Label>
            <Select
              value={String(state.selectedTranslation)}
              onValueChange={(value) =>
                dispatch({ type: "SET_TRANSLATION", payload: Number(value) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Translation" />
              </SelectTrigger>
              <SelectContent className="bg-[#1d2021] border-[#3c3836] text-[#ebdbb2]">
                {translations.map((t) => (
                  <SelectItem
                    key={t.id}
                    value={String(t.id)}
                    className="cursor-pointer"
                  >
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset & Share */}
          <div>
            <Label className="text-sm text-[#ebdbb2]">Actions</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button
                onClick={() => dispatch({ type: "RESET_SETTINGS" })}
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
}
