/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Runway` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Chart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Runway.name_unique" ON "Runway"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chart.name_unique" ON "Chart"("name");
