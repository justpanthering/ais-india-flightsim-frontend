-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "id" SERIAL NOT NULL,
    "icao" TEXT NOT NULL,
    "localeName" TEXT NOT NULL,
    "aerodomeName" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "latitudeMeasurement" DOUBLE PRECISION NOT NULL,
    "latitudeHemisphere" TEXT NOT NULL,
    "longitudeMeasurement" DOUBLE PRECISION NOT NULL,
    "longitudeHemisphere" TEXT NOT NULL,
    "elevation" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "radarTrafficCommunicationFrequency" DOUBLE PRECISION[],
    "approachTrafficCommunicationFrequency" DOUBLE PRECISION[],
    "towerTrafficCommunicationFrequency" DOUBLE PRECISION[],
    "controlTrafficCommunicationFrequency" DOUBLE PRECISION[],
    "informationTrafficCommunicationFrequency" DOUBLE PRECISION[],
    "groundTrafficCommunicationFrequency" DOUBLE PRECISION[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Runway" (
    "id" SERIAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dimension" DOUBLE PRECISION NOT NULL,
    "surface" TEXT NOT NULL,
    "latitudeMeasurement" DOUBLE PRECISION NOT NULL,
    "latitudeHemisphere" TEXT NOT NULL,
    "longitudeMeasurement" DOUBLE PRECISION NOT NULL,
    "longitudeHemisphere" TEXT NOT NULL,
    "elevation" DOUBLE PRECISION NOT NULL,
    "visualSlopeIndicationSystem" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "airportId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Airport.icao_unique" ON "Airport"("icao");

-- AddForeignKey
ALTER TABLE "Airport" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Runway" ADD FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD FOREIGN KEY ("airportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
