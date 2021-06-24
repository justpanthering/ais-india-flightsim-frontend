/*
  Warnings:

  - You are about to drop the column `latitude` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Airport` table. All the data in the column will be lost.
  - Added the required column `latitudeHemisphere` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitudeMeasurement` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitudeHemisphere` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitudeMeasurement` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icao" TEXT NOT NULL,
    "localeName" TEXT NOT NULL,
    "aerodomeName" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "latitudeMeasurement" REAL NOT NULL,
    "latitudeHemisphere" TEXT NOT NULL,
    "longitudeMeasurement" REAL NOT NULL,
    "longitudeHemisphere" TEXT NOT NULL,
    "elevation" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Airport" ("address", "aerodomeName", "authorId", "createdAt", "elevation", "icao", "id", "localeName", "updatedAt") SELECT "address", "aerodomeName", "authorId", "createdAt", "elevation", "icao", "id", "localeName", "updatedAt" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
