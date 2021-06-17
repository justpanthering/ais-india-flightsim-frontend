import { NextApiRequest, NextApiResponse } from "next";
import { hash, compare } from "bcryptjs";
import prisma from "../../lib/prisma/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<NextApiResponse>(async (resolve, reject) => {
    const { username, password } = req.body;
    // If username and password missing
    if (!username || !password) {
      res.status(400).json({ message: "Invalid username" });
      return resolve(res);
    }
    const userFromDatabase = await prisma.user.findUnique({
      where: {
        email: username,
      },
    });
    // if user not present in database
    if (!userFromDatabase) {
      res.status(400).json({
        message: `User not found in database`,
      });
      return resolve(res);
    }
    compare(password, userFromDatabase.password)
      .then((result) => {
        if (result) {
          // on success
          const { email } = userFromDatabase;
          res.status(200).json({
            email,
          });
          return resolve(res);
        } else {
          // on failure
          res.status(401).json({
            message: `Incorrect username or password`,
          });
          return resolve(res);
        }
      })
      .catch((err) => {
        // on error
        res.status(500).json({
          message: err.message,
        });
        return resolve(res);
      });
  });
};
