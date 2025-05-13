import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "These are the seeds",
    seeds: ["/dimensions", "/challenges"],
  });
};
