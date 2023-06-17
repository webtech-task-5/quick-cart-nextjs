import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import User from "models/User";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const method = req.method;
  const id = req.query.id;
  console.log(res);
  if (method == "GET") {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
};
