import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma/prisma";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<any>> => {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      const { id } = req.query as { id: string };
      prisma.airport
        .findUnique({
          where: {
            id: Number(id),
          },
          include: {
            runways: true,
            charts: true,
            approachTrafficCommunicationFrequency: true,
            controlTrafficCommunicationFrequency: true,
            groundTrafficCommunicationFrequency: true,
            informationTrafficCommunicationFrequency: true,
            radarTrafficCommunicationFrequency: true,
            towerTrafficCommunicationFrequency: true,
          },
        })
        .then((airport) => {
          if (!airport) {
            res.status(404).json({
              message: "Airport not found!",
            });
            return resolve(res);
          }
          res.status(200).json({
            ...airport,
            runways: airport.runways.map((runway) => ({
              ...runway,
              coordinates: {
                latitude: {
                  measurement: runway.latitudeMeasurement,
                  hemisphere: runway.latitudeHemisphere,
                },
                longitude: {
                  measurement: runway.longitudeMeasurement,
                  hemisphere: runway.longitudeHemisphere,
                },
              },
              radarTrafficCommunicationFrequency:
                airport.radarTrafficCommunicationFrequency.map(
                  (freq) => freq.frequency
                ),
              towerTrafficCommunicationFrequency:
                airport.towerTrafficCommunicationFrequency.map(
                  (freq) => freq.frequency
                ),
              controlTrafficCommunicationFrequency:
                airport.controlTrafficCommunicationFrequency.map(
                  (freq) => freq.frequency
                ),
              approachTrafficCommunicationFrequency:
                airport.approachTrafficCommunicationFrequency.map(
                  (freq) => freq.frequency
                ),
              groundTrafficCommunicationFrequency:
                airport.groundTrafficCommunicationFrequency.map(
                  (freq) => freq.frequency
                ),
              informationTrafficCommunicationFrequency:
                airport.informationTrafficCommunicationFrequency.map(
                  (freq) => freq.frequency
                ),
            })),
          });
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
