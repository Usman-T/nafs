import prisma from "@/prisma";
import { Reflection, SavedAyah } from "@prisma/client";

export const saveAyah = async (
  verseKey: string,
  verseArabic: string,
  verseTranslation: string,
  surahName: string,
  email: string
): Promise<SavedAyah> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const existing = await prisma.savedAyah.findFirst({
    where: { userId: user.id, verseKey },
  });

  if (existing) return existing;

  return await prisma.savedAyah.create({
    data: {
      verseKey,
      surahName,
      arabic: verseArabic,
      translation: verseTranslation,
      userId: user.id,
    },
  });
};

export const reflectAyah = async (
  reflectionText: string,
  verseKey: string,
  verseArabic: string,
  email: string
): Promise<Reflection> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  return await prisma.reflection.create({
    data: {
      verseKey,
      reflectionText,
      arabic: verseArabic,
      userId: user.id,
    },
  });
};

export const favouriteReflection = async (
  reflectionId: string,
  favourite: boolean
): Promise<Reflection> => {
  return await prisma.reflection.update({
    where: { id: reflectionId },
    data: { favourite },
  });
};
