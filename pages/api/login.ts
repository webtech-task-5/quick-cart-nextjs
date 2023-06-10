import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import Test from "../../models/Test";
// fake login
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const request = req.body;
  const email = request.email;
  const password = request.password;
  await Test.create({ name: email });

  if (email === "johndoe@mail.com" && password === "ecommerce") {
    res.status(200).json({ status: true });
  } else {
    res.status(401).json({ status: false });
  }
};
