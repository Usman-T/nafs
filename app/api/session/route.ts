import { fetchCurrentChallenge } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await fetchCurrentChallenge();
  return NextResponse.json(session);
};
