/*
  Warnings:

  - A unique constraint covering the columns `[icao]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Airport.icao_unique" ON "Airport"("icao");
