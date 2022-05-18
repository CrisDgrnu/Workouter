/*
  Warnings:

  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "workout";

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'Workout',
    "duration" INTEGER DEFAULT 0,
    "score" INTEGER DEFAULT 5,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);
