import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../../libs/dbConnect";
import Product from "../../../models/Product";
import User from "../../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  await dbConnect();
  if (method == "POST") {
    try {
      const { name, category, price, imagelist, spec, sellerId } = req.body;

      const images = imagelist;
      const product = new Product({
        name,
        category,
        price,
        images,
        spec,
        sellerId,
      });
      await product.save();
      res.status(200).json(product);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  } else if (method == "GET") {
    try {
      // product field had sellerId and we need to populate it
      const products = await Product.find({}).populate({
        path: "sellerId",
        model: User,
      });
      res.status(200).json(products);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  }
};
