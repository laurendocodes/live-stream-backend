/*
  Warnings:

  - Added the required column `description` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "coverArt" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "isEnded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL;
