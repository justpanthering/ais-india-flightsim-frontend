import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma/prisma";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<any>> => {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      const { filter } = req.query as { filter: string };
      if (filter) {
        prisma.airport
          .findMany({
            where: {
              OR: [
                {
                  icao: {
                    contains: filter,
                  },
                },
                {
                  localeName: {
                    contains: filter,
                  },
                },
              ],
            },
          })
          .then((airports) => {
            console.log("returning");
            res.status(200).json({
              airports,
            });
            return resolve(res);
          })
          .catch((e) => {
            console.error(e);
            res.status(500).json({ message: e.message });
            return resolve(res);
          });
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
          })
          .catch((e) => {
            console.error(e);
            res.status(500).json({ message: e.message });
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
