import { NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async () => {
  const dimensions = await Promise.all([
    prisma.dimension.create({
      data: {
        name: "Faith",
        description:
          "Iman in practice - Salah, sincerity, intentions, tawakkul",
        color: "#00FFF7",
        icon: "Sparkles",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Remembrance",
        description:
          "Inner connection to Allah - Dhikr, du'a, istighfar, presence",
        color: "#FF6EC7",
        icon: "Brain",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Knowledge",
        description:
          "Learning for the soul - Quran, Hadith, Islamic studies, reflection",
        color: "#FFD300",
        icon: "BookOpen",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Character",
        description:
          "The Sunnah in action - Manners, patience, honesty, humility",
        color: "#39FF14",
        icon: "HeartHandshake",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Discipline",
        description:
          "Mastering the self - Fajr wake-ups, fasting, time management, resisting the nafs",
        color: "#FF073A",
        icon: "AlarmClock",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Body",
        description:
          "The amana of your health - Sleep, exercise, energy, nutrition",
        color: "#00BFFF",
        icon: "Dumbbell",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Purpose",
        description:
          "Ambition for the akhirah & dunya - Meaningful goals with divine intention",
        color: "#B026FF",
        icon: "Target",
      },
    }),
  ]);

  return NextResponse.json(dimensions);
};
