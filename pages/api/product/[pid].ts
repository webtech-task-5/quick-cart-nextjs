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
  if (req.method === "PUT") {
    try {
      const { name, category, price, imagelist, spec, sellerId, stock } =
        req.body;

      const images = imagelist;
      let product = (await Product.findById(pid)) as any;
      product.name = name;
      product.category = category;
      product.price = price;
      product.images = images;
      product.spec = spec;
      product.stock = stock;
      product.sellerId = sellerId;
      await product.save();
      res.status(200).json(product);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  }
};
