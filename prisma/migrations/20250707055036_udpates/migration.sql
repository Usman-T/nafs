/*
  Warnings:

  - Made the column `lastActiveDate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastActiveDate" SET NOT NULL,
ALTER COLUMN "lastActiveDate" SET DEFAULT CURRENT_TIMESTAMP;
