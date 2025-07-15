/*
  Warnings:

  - Added the required column `verseKey` to the `Reflection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surahName` to the `SavedAyah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `translation` to the `SavedAyah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reflection" ADD COLUMN     "verseKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SavedAyah" ADD COLUMN     "surahName" TEXT NOT NULL,
ADD COLUMN     "translation" TEXT NOT NULL;
