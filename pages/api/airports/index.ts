import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma/prisma";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<any>> => {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      const { filter } = req.query;
      if (filter) {
        res.status(501).json({
          message: "Query flow not implemented",
        });
        return resolve(res);
      } else {
        prisma.airport
          .findMany({
            select: {
              id: true,
              localeName: true,
              icao: true,
            },
            orderBy: {
              icao: "asc",
            },
          })
          .then((airports) => {
            res.status(200).json({
              airports,
            });
            return resolve(res);
          });
      }
    } else {
      res.status(405).json({
        message: "Method not allowed",
      });
      return resolve(res);
    }
  });
};
