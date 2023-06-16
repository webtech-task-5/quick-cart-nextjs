import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import User from "../../models/User";
import jwt from "jsonwebtoken";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const method = req.method;
  if (method == "POST") {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(500).json({
          error: "User not found",
        });
      }
      console.log(user.email);
      if (user.password != password) {

        return res.status(500).json({
          error: "Credentials doesn't match",
        });
      }
      user.password = null;
      const data = {
        ...user
      }
      const sectetKey = process.env.JWT_SECRET as string;
      const token = jwt.sign(data, sectetKey, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({ message: "User created successfully", token, user });
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  }
};
