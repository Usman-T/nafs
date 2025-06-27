-- AlterTable
ALTER TABLE "User" ADD COLUMN     "extraTaskId" TEXT;

-- CreateTable
CREATE TABLE "ExtraTask" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "points" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dimensionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExtraTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExtraTask_userId_key" ON "ExtraTask"("userId");

-- AddForeignKey
ALTER TABLE "ExtraTask" ADD CONSTRAINT "ExtraTask_dimensionId_fkey" FOREIGN KEY ("dimensionId") REFERENCES "Dimension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraTask" ADD CONSTRAINT "ExtraTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
