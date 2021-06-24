/*
  Warnings:

  - You are about to drop the column `designation` on the `Runway` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Runway` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Runway` table. All the data in the column will be lost.
  - You are about to alter the column `dimension` on the `Runway` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `elevation` on the `Runway` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - Added the required column `latitudeHemisphere` to the `Runway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitudeMeasurement` to the `Runway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitudeHemisphere` to the `Runway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitudeMeasurement` to the `Runway` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Runway` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Runway" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "airportId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dimension" REAL NOT NULL,
    "surface" TEXT NOT NULL,
    "latitudeMeasurement" REAL NOT NULL,
    "latitudeHemisphere" TEXT NOT NULL,
    "longitudeMeasurement" REAL NOT NULL,
    "longitudeHemisphere" TEXT NOT NULL,
    "elevation" REAL NOT NULL,
    "visualSlopeIndicationSystem" TEXT,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Runway" ("airportId", "dimension", "elevation", "id", "surface", "visualSlopeIndicationSystem") SELECT "airportId", "dimension", "elevation", "id", "surface", "visualSlopeIndicationSystem" FROM "Runway";
DROP TABLE "Runway";
ALTER TABLE "new_Runway" RENAME TO "Runway";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
