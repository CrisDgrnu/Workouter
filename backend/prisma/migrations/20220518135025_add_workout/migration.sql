-- CreateTable
CREATE TABLE "workout" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'Workout',
    "duration" INTEGER DEFAULT 0,
    "score" INTEGER DEFAULT 5,

    CONSTRAINT "workout_pkey" PRIMARY KEY ("id")
);
