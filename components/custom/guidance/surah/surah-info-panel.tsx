"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSurah } from "@/lib/context/surah-page-context";
import { renderTafsir } from "@/lib/utils/renderTafsir";

export default function SurahInfoPanel() {
  const { surah, refs } = useSurah();

  if (!surah) return null;

  return (
    <Drawer>
      <DrawerTrigger ref={refs.infoButtonRef} asChild>
        <div></div>
      </DrawerTrigger>
      <DrawerContent className="bg-[#1d2021] border-t border-[#3c3836] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-[#ebdbb2]">
            Surah Information
          </DrawerTitle>
          <DrawerDescription className="text-[#a89984]">
            Overview and virtues of this surah
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#3c3836] flex items-center justify-center text-xl font-bold text-[#fe8019]">
              {surah.id}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#ebdbb2]">
                {surah.name}
              </h3>
              <p className="text-sm text-[#a89984]">
                {surah.verses} verses • {surah.type}
              </p>
            </div>
            <div className="ml-auto text-3xl font-arabic text-[#fe8019]">
              {surah.arabicName}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Stat label="Number" value={surah.id} />
            <Stat label="Verses" value={surah.verses} />
            <Stat label="Type" value={surah.type} />
            <Stat label="Order" value={surah.order ?? "Unknown"} />
          </div>
          {surah.about && (
            <div className="p-4 rounded-lg border border-[#3c3836]">
              <h4 className="font-medium mb-2 text-[#ebdbb2]">
                About this Surah
              </h4>
              <p className="text-sm text-[#a89984] whitespace-pre-line">
                {surah.about}
              </p>
            </div>
          )}

          {surah.virtue && (
            <div className="p-4 rounded-lg border border-[#3c3836] overflow-y-auto">
              <h4 className="font-medium mb-2 text-[#ebdbb2]">Virtues</h4>
              <p className="text-sm text-[#a89984] ">
                {renderTafsir(surah.virtue)}
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-3 rounded-lg border border-[#3c3836] bg-[#1d2021]">
      <p className="text-xs text-[#a89984]">{label}</p>
      <p className="text-lg font-medium text-[#ebdbb2]">{value}</p>
    </div>
  );
}
