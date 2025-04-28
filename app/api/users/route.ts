import { getUsers } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async () => {
  const users = await getUsers();
  return NextResponse.json(users);
};
