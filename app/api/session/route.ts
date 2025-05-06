import { currentChallenge } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await currentChallenge();
  return NextResponse.json(session);
};
