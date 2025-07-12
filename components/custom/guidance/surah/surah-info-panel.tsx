"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const SurahInfoPanel = ({
  surah,
  isDarkMode,
  infoButtonRef,
}: {
  surah: any;
  isDarkMode: boolean;
  infoButtonRef: any;
}) => {
  return (
    <Drawer>
      <DrawerTrigger ref={infoButtonRef} asChild>
        <div></div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Surah Information</DrawerTitle>
          <DrawerDescription>
            Customize the quran reader to your liking
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className={`h-16 w-16 rounded-full ${
                  isDarkMode ? "bg-[#3c3836]" : "bg-gray-100"
                } flex items-center justify-center text-xl font-bold ${
                  isDarkMode ? "text-[#fe8019]" : "text-amber-500"
                }`}
              >
                {surah.id}
              </div>
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  {surah.name}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-[#a89984]" : "text-gray-500"
                  }`}
                >
                  {surah.verses} verses • {surah.type}
                </p>
              </div>
              <div className="ml-auto">
                <p
                  className={`text-3xl font-arabic ${
                    isDarkMode ? "text-[#fe8019]" : "text-amber-500"
                  }`}
                >
                  {surah.arabicName}
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836]"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <h4
                className={`font-medium mb-2 ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                About this Surah
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-600"
                }`}
              >
                {surah.id === 1
                  ? "Surah Al-Fatihah, also known as 'The Opening,' is the first chapter of the Quran. It consists of seven verses and is recited in every unit of prayer (rakat) in the Islamic prayer (salah). It is a prayer for guidance and mercy from Allah, and it encapsulates the essence of the Quran's message."
                  : surah.id === 2
                  ? "Surah Al-Baqarah, 'The Cow,' is the longest chapter of the Quran with 286 verses. It was revealed in Medina and covers various aspects of Islamic law, faith, and history. The surah derives its name from the story of the cow that the Children of Israel were commanded to sacrifice."
                  : "Information about this surah is not available."}
              </p>
            </div>

            <div
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-[#1d2021] border border-[#3c3836]"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <h4
                className={`font-medium mb-2 ${
                  isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                }`}
              >
                Virtues
              </h4>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-[#a89984]" : "text-gray-600"
                }`}
              >
                {surah.id === 1
                  ? "The Prophet Muhammad (peace be upon him) said: 'The Opening of the Book (Al-Fatihah) is the best surah in the Quran.' It is also known as 'The Mother of the Quran' (Umm al-Quran) and 'The Seven Oft-Repeated Verses' (As-Sab' Al-Mathani)."
                  : surah.id === 2
                  ? "The Prophet Muhammad (peace be upon him) said: 'Do not turn your houses into graves. Verily, Satan does not enter the house where Surah Al-Baqarah is recited.' The last two verses of this surah are also known to provide protection when recited at night."
                  : "Information about the virtues of this surah is not available."}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-[#1d2021] border border-[#3c3836]"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-[#a89984]" : "text-gray-500"
                  }`}
                >
                  Number
                </p>
                <p
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  {surah.id}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-[#1d2021] border border-[#3c3836]"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-[#a89984]" : "text-gray-500"
                  }`}
                >
                  Verses
                </p>
                <p
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  {surah.verses}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-[#1d2021] border border-[#3c3836]"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-[#a89984]" : "text-gray-500"
                  }`}
                >
                  Type
                </p>
                <p
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  {surah.type}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-[#1d2021] border border-[#3c3836]"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <p
                  className={`text-xs ${
                    isDarkMode ? "text-[#a89984]" : "text-gray-500"
                  }`}
                >
                  Order
                </p>
                <p
                  className={`text-lg font-medium ${
                    isDarkMode ? "text-[#ebdbb2]" : "text-gray-800"
                  }`}
                >
                  {surah.id === 1 ? "5th" : surah.id === 2 ? "87th" : "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SurahInfoPanel;
