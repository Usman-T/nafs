const isUsingAccelerate =
  process.env.PRISMA_DATABASE_URL?.startsWith("prisma://");

let prisma: any;

if (isUsingAccelerate) {
  const { PrismaClient } = require("@prisma/client/edge");
  const { withAccelerate } = require("@prisma/extension-accelerate");

  const prismaClientSingleton = () => {
    return new PrismaClient().$extends(withAccelerate());
  };

  declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  } & typeof global;

  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
  }
} else {
  // Development: Use regular Prisma Client
  const { PrismaClient } = require("@prisma/client");

  const prismaClientSingleton = () => {
    return new PrismaClient({
      log:
        process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  };

  declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
  } & typeof global;

  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
  }
}

export default prisma;
