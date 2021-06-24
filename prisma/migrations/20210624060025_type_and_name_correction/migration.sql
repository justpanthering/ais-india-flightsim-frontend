/*
  Warnings:

  - You are about to alter the column `frequency` on the `ApproachTrafficCommunicationFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `frequency` on the `GroundTrafficCommunicationFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `frequency` on the `TowerTrafficCommunicationFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `frequency` on the `InformationTrafficCommunicationFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `frequency` on the `RadarTrafficCommunicationFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `frequency` on the `ControlTrafficCommunicationFrequency` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApproachTrafficCommunicationFrequency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" REAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ApproachTrafficCommunicationFrequency" ("airportId", "frequency", "id") SELECT "airportId", "frequency", "id" FROM "ApproachTrafficCommunicationFrequency";
DROP TABLE "ApproachTrafficCommunicationFrequency";
ALTER TABLE "new_ApproachTrafficCommunicationFrequency" RENAME TO "ApproachTrafficCommunicationFrequency";
CREATE TABLE "new_GroundTrafficCommunicationFrequency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" REAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GroundTrafficCommunicationFrequency" ("airportId", "frequency", "id") SELECT "airportId", "frequency", "id" FROM "GroundTrafficCommunicationFrequency";
DROP TABLE "GroundTrafficCommunicationFrequency";
ALTER TABLE "new_GroundTrafficCommunicationFrequency" RENAME TO "GroundTrafficCommunicationFrequency";
CREATE TABLE "new_TowerTrafficCommunicationFrequency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" REAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TowerTrafficCommunicationFrequency" ("airportId", "frequency", "id") SELECT "airportId", "frequency", "id" FROM "TowerTrafficCommunicationFrequency";
DROP TABLE "TowerTrafficCommunicationFrequency";
ALTER TABLE "new_TowerTrafficCommunicationFrequency" RENAME TO "TowerTrafficCommunicationFrequency";
CREATE TABLE "new_InformationTrafficCommunicationFrequency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" REAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InformationTrafficCommunicationFrequency" ("airportId", "frequency", "id") SELECT "airportId", "frequency", "id" FROM "InformationTrafficCommunicationFrequency";
DROP TABLE "InformationTrafficCommunicationFrequency";
ALTER TABLE "new_InformationTrafficCommunicationFrequency" RENAME TO "InformationTrafficCommunicationFrequency";
CREATE TABLE "new_RadarTrafficCommunicationFrequency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" REAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RadarTrafficCommunicationFrequency" ("airportId", "frequency", "id") SELECT "airportId", "frequency", "id" FROM "RadarTrafficCommunicationFrequency";
DROP TABLE "RadarTrafficCommunicationFrequency";
ALTER TABLE "new_RadarTrafficCommunicationFrequency" RENAME TO "RadarTrafficCommunicationFrequency";
CREATE TABLE "new_ControlTrafficCommunicationFrequency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frequency" REAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    FOREIGN KEY ("airportId") REFERENCES "Airport" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ControlTrafficCommunicationFrequency" ("airportId", "frequency", "id") SELECT "airportId", "frequency", "id" FROM "ControlTrafficCommunicationFrequency";
DROP TABLE "ControlTrafficCommunicationFrequency";
ALTER TABLE "new_ControlTrafficCommunicationFrequency" RENAME TO "ControlTrafficCommunicationFrequency";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
