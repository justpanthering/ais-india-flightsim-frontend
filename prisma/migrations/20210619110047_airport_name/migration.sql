/*
  Warnings:

  - Added the required column `aerodomeName` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localeName` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "icao" TEXT NOT NULL,
    "localeName" TEXT NOT NULL,
    "aerodomeName" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "elevation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Airport" ("address", "authorId", "elevation", "icao", "id", "latitude", "longitude") SELECT "address", "authorId", "elevation", "icao", "id", "latitude", "longitude" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
