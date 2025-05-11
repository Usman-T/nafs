import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const dimensions = await prisma.dimension.findMany({});
  return NextResponse.json(dimensions);
};
