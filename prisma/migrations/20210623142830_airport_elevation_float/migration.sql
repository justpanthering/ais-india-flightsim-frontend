/*
  Warnings:

  - You are about to alter the column `elevation` on the `Airport` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

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
    "elevation" REAL NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Airport" ("address", "aerodomeName", "authorId", "createdAt", "elevation", "icao", "id", "latitude", "localeName", "longitude", "updatedAt") SELECT "address", "aerodomeName", "authorId", "createdAt", "elevation", "icao", "id", "latitude", "localeName", "longitude", "updatedAt" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
