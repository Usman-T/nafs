/*
  Warnings:

  - You are about to drop the column `content` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `Reflection` table. All the data in the column will be lost.
  - Added the required column `arabic` to the `Reflection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reflectionText` to the `Reflection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reflection` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reflection_userId_date_idx";

-- AlterTable
ALTER TABLE "Reflection" DROP COLUMN "content",
DROP COLUMN "date",
DROP COLUMN "mood",
ADD COLUMN     "arabic" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "favourite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "reflectionText" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "readingStreak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "SavedAyah" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "verseKey" TEXT NOT NULL,
    "arabic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedAyah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastRead" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentVerse" INTEGER NOT NULL,
    "surahId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SavedAyah_userId_idx" ON "SavedAyah"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedAyah_userId_verseKey_key" ON "SavedAyah"("userId", "verseKey");

-- CreateIndex
CREATE INDEX "Reading_userId_idx" ON "Reading"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Reading_userId_key" ON "Reading"("userId");

-- CreateIndex
CREATE INDEX "Reflection_userId_createdAt_idx" ON "Reflection"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "SavedAyah" ADD CONSTRAINT "SavedAyah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
