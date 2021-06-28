import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { getRunwayDetailsForDatabase } from "../../../lib/api/airports";
import prisma from "../../../lib/prisma/prisma";
import { Airport } from "../../../types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<any>> => {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      getSession({ req })
        .then((session) => {
          if (session) {
            if (!session.user?.email) {
              res.status(401).json({ message: "Not Authorised!" });
              return resolve(res);
            }
            prisma.user
              .findUnique({
                where: {
                  email: session.user.email,
                },
              })
              .then((user) => {
                if (!user) {
                  res.status(401).json({ message: "Not Authorised!" });
                  return resolve(res);
                }
                const airportData: Airport = req.body;
                prisma.airport
                  .findUnique({
                    where: {
                      icao: airportData.icao,
                    },
                  })
                  .then((existingAirport) => {
                    if (existingAirport) {
                      res.status(400).json({
                        message: `Airport with icao '${existingAirport.icao}' already exists`,
                      });
                      return resolve(res);
                    }
                    prisma.airport
                      .create({
                        data: {
                          authorId: user.id,
                          icao: airportData.icao,
                          localeName: airportData.localeName,
                          aerodomeName: airportData.aerodomeName,
                          latitudeMeasurement:
                            airportData.coordinates.latitude.measurement,
                          latitudeHemisphere:
                            airportData.coordinates.latitude.hemisphere,
                          longitudeMeasurement:
                            airportData.coordinates.longitude.measurement,
                          longitudeHemisphere:
                            airportData.coordinates.longitude.hemisphere,
                          elevation: airportData.elevation,
                          address: airportData.address,
                          runways: {
                            create: airportData.runways.map((runway) =>
                              getRunwayDetailsForDatabase(runway)
                            ),
                          },
                          charts: {
                            create: airportData.charts.map((chart) => ({
                              ...chart,
                            })),
                          },
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
                        },
                        include: {
                          runways: true,
                          charts: true,
                        },
                      })
                      .then((airport) => {
                        res.status(200).json({
                          airport,
                        });
                        return resolve(res);
                      })
                      .catch((e) => {
                        res.status(500).json({ message: e.message });
                        return resolve(res);
                      });
                  })
                  .catch((e) => {
                    res.status(500).json({ message: e.message });
                    return resolve(res);
                  });
              })
              .catch((e) => {
                res.status(500).json({ message: e.message });
                return resolve(res);
              });
          } else {
            res.status(401).json({ message: "Not Authorised!" });
            return resolve(res);
          }
        })
        .catch((e) => {
          res.status(500).json({ message: e.message });
          return resolve(res);
        });
    } else {
      res.status(405).json({
        message: "Method not allowed",
      });
      return resolve(res);
    }
  });
};
