import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const challenges = await prisma.challenge.findMany({});
  return NextResponse.json(challenges);
};
