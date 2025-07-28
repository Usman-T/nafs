// import { auth } from "@/auth";

// export const updateAccountSettings = async (
//   name: string | null,
//   email: string | null,
//   currentPassword: string | null,
//   newPassword: string | null
// ) => {
//   try {
//     const session = await auth();

//     if (session?.user) {
//       throw new Error("Authentication failed");
//     }

//     const userUpdated = await prisma.user.findandQue
//   } catch (error) {
//     console.log(error);

//     return { success: false, error: error?.message || "An error occured" };
//   }
// };
