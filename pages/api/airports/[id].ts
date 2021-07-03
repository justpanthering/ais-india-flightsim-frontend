import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma/prisma";
import {
  getAirportDetailsForClient,
  getAirportDetailsForDatabase,
  getRunwayDetailsForDatabase,
} from "../../../lib/api/airports";
import { getSession } from "next-auth/client";
import { Airport } from "../../../types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<any>> => {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      const { id } = req.query as { id: string };
      // Find airport
      prisma.airport
        .findUnique({
          where: {
            id: Number(id),
          },
          include: {
            runways: true,
            charts: true,
          },
        })
        .then((airport) => {
          if (!airport) {
            res.status(404).json({
              message: "Airport not found!",
            });
            return resolve(res);
          }
          console.log("found airport: ", airport);
          res.status(200).json({
            airport: getAirportDetailsForClient(airport),
          });
          return resolve(res);
        })
        .catch((e) => {
          res.status(500).json({ message: e.message });
          return resolve(res);
        });
    } else if (req.method === "PUT") {
      getSession({ req })
        .then((session) => {
          if (!session?.user?.email) {
            res.status(401).json({ message: "Not Authorised!" });
            return resolve(res);
          }
          // Find User
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
              const { id } = req.query as { id: string };
              const airportData: Airport = req.body;
              // Find Airport to be Updated
              prisma.airport
                .findUnique({
                  where: {
                    id: Number(id),
                  },
                })
                .then((airport) => {
                  if (!airport || airport.id !== airportData.id) {
                    res.status(404).json({
                      message: "Airport not found!",
                    });
                    return resolve(res);
                  }
                  // Update or insert runway
                  prisma
                    .$transaction(
                      airportData.runways.map((runway) =>
                        prisma.runway.upsert({
                          where: {
                            id: runway.id || -1,
                          },
                          update: { ...getRunwayDetailsForDatabase(runway) },
                          create: { ...getRunwayDetailsForDatabase(runway) },
                        })
                      )
                    )
                    .then((runways) => {
                      // Update or insert chart
                      prisma
                        .$transaction(
                          airportData.charts.map((chart) =>
                            prisma.chart.upsert({
                              where: {
                                id: chart.id || -1,
                              },
                              create: { ...chart },
                              update: { ...chart },
                            })
                          )
                        )
                        .then((charts) => {
                          // Update Airport
                          prisma.airport
                            .update({
                              where: {
                                id: airportData.id,
                              },
                              data: {
                                ...getAirportDetailsForDatabase(
                                  airportData,
                                  user
                                ),
                                runways: {
                                  connect: runways.map((runway) => ({
                                    id: runway.id,
                                  })),
                                },
                                charts: {
                                  connect: charts.map((chart) => ({
                                    id: chart.id,
                                  })),
                                },
                              },
                              include: {
                                runways: true,
                                charts: true,
                              },
                            })
                            .then((airport) => {
                              res.status(200).json({
                                airport: getAirportDetailsForClient(airport),
                              });
                              return resolve(res);
                            })
                            .catch((e) => {
                              console.error(e);
                              res.status(500).json({ message: e.message });
                              return resolve(res);
                            });
                        })
                        .catch((e) => {
                          console.error(e);
                          res.status(500).json({ message: e.message });
                          return resolve(res);
                        });
                    })
                    .catch((e) => {
                      console.error(e);
                      res.status(500).json({ message: e.message });
                      return resolve(res);
                    });
                })
                .catch((e) => {
                  console.error(e);
                  res.status(500).json({ message: e.message });
                  return resolve(res);
                });
            })
            .catch((e) => {
              console.error(e);
              res.status(500).json({ message: e.message });
              return resolve(res);
            });
        })
        .catch((e) => {
          console.error(e);
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
