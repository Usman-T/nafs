import { NextResponse } from "next/server";
import prisma from "@/prisma";

export const GET = async () => {
  const dimensions = await Promise.all([
    prisma.dimension.create({
      data: {
        name: "Faith",
        description:
          "Iman in practice - Salah, sincerity, intentions, tawakkul",
        color: "#2E86AB",
        icon: "Sparkles",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Remembrance",
        description:
          "Inner connection to Allah - Dhikr, du'a, istighfar, presence",
        color: "#5D5C61",
        icon: "Brain",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Knowledge",
        description:
          "Learning for the soul - Quran, Hadith, Islamic studies, reflection",
        color: "#F18F01",
        icon: "BookOpen",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Character",
        description:
          "The Sunnah in action - Manners, patience, honesty, humility",
        color: "#3A7D44",
        icon: "HeartHandshake",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Discipline",
        description:
          "Mastering the self - Fajr wake-ups, fasting, time management, resisting the nafs",
        color: "#6B2737",
        icon: "AlarmClock",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Body",
        description:
          "The amana of your health - Sleep, exercise, energy, nutrition",
        color: "#48ACF0",
        icon: "Activity",
      },
    }),

    prisma.dimension.create({
      data: {
        name: "Purpose",
        description:
          "Ambition for the akhirah & dunya - Meaningful goals with divine intention",
        color: "#6A4C93",
        icon: "Target",
      },
    }),
  ]);

  return NextResponse.json(dimensions);
};
