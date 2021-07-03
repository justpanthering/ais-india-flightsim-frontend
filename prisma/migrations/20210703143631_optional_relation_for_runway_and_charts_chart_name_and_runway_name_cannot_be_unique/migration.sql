-- DropIndex
DROP INDEX "Chart.name_unique";

-- DropIndex
DROP INDEX "Runway.name_unique";

-- AlterTable
ALTER TABLE "Chart" ALTER COLUMN "airportId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Runway" ALTER COLUMN "airportId" DROP NOT NULL;
