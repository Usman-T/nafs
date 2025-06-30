import { auth } from "@/auth";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return user?.id;
}

export async function requireAuth() {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}