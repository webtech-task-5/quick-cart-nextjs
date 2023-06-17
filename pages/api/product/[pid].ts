import type { NextApiRequest, NextApiResponse } from "next";
import Product from "models/Product";
import dbConnect from "libs/dbConnect";
import User from "models/User";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const {
    query: { pid },
  } = req;
  if (req.method === "GET") {
    const product = await Product.findById(pid).populate({
      path: "sellerId",
      model: User,
    });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }
};
