import { Airport, Runway } from "../../../types";
import {
  Airport as AirportDatabase,
  Runway as RunwayDatabase,
  Chart as ChartDatabase,
  User,
} from "@prisma/client";

export function getAirportDetailsForClient(
  airport: AirportDatabase & {
    runways: RunwayDatabase[];
    charts: ChartDatabase[];
  }
): Airport {
  return {
    ...airport,
    coordinates: {
      latitude: {
        measurement: airport.latitudeMeasurement,
        hemisphere: airport.latitudeHemisphere as "N" | "S",
      },
      longitude: {
        measurement: airport.longitudeMeasurement,
        hemisphere: airport.longitudeHemisphere as "E" | "W",
      },
    },
    runways: airport.runways.map((runway) => ({
      ...runway,
      coordinates: {
        latitude: {
          measurement: runway.latitudeMeasurement,
          hemisphere: runway.latitudeHemisphere as "N" | "S",
        },
        longitude: {
          measurement: runway.longitudeMeasurement,
          hemisphere: runway.longitudeHemisphere as "E" | "W",
        },
      },
      visualSlopeIndicationSystem: runway.visualSlopeIndicationSystem || "",
    })),
  };
}

export function getAirportDetailsForDatabase(
  airportData: Airport,
  user: User
): Omit<AirportDatabase, "createdAt" | "updatedAt" | "id" | "runway"> {
  return {
    authorId: user.id,
    icao: airportData.icao,
    localeName: airportData.localeName,
    aerodomeName: airportData.aerodomeName,
    latitudeMeasurement: airportData.coordinates.latitude.measurement,
    latitudeHemisphere: airportData.coordinates.latitude.hemisphere,
    longitudeMeasurement: airportData.coordinates.longitude.measurement,
    longitudeHemisphere: airportData.coordinates.longitude.hemisphere,
    elevation: airportData.elevation,
    address: airportData.address,
    approachTrafficCommunicationFrequency:
      airportData.approachTrafficCommunicationFrequency,
    controlTrafficCommunicationFrequency:
      airportData.controlTrafficCommunicationFrequency,
    groundTrafficCommunicationFrequency:
      airportData.groundTrafficCommunicationFrequency,
    informationTrafficCommunicationFrequency:
      airportData.informationTrafficCommunicationFrequency,
    radarTrafficCommunicationFrequency:
      airportData.radarTrafficCommunicationFrequency,
    towerTrafficCommunicationFrequency:
      airportData.towerTrafficCommunicationFrequency,
  };
}

export function getRunwayDetailsForDatabase(
  runway: Runway
): Omit<RunwayDatabase, "id" | "airportId"> {
  return {
    name: runway.name,
    dimension: runway.dimension,
    surface: runway.surface,
    elevation: runway.elevation,
    latitudeMeasurement: runway.coordinates.latitude.measurement,
    latitudeHemisphere: runway.coordinates.latitude.hemisphere,
    longitudeMeasurement: runway.coordinates.longitude.measurement,
    longitudeHemisphere: runway.coordinates.longitude.hemisphere,
    visualSlopeIndicationSystem: runway.visualSlopeIndicationSystem,
    trueBearing: runway.trueBearing,
  };
}
