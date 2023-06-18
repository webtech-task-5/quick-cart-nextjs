import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import User from "models/User";
import Order from "models/Order";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const method = req.method;
  const id = req.query.id;
  const type = req.query.type;
  if (method == "GET") {
    try {
      const user = await User.findById(id);
      const bankAccount = user?.bankAccount;
      const result = await Order.aggregate([
        {
          $match: {
            sellerId: bankAccount,
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $group: {
            _id: "$sellerId",
            totalPrice: {
              $sum: {
                $multiply: [
                  { $toInt: "$quantity" },
                  { $toInt: "$product.price" },
                ],
              },
            },
          },
        },
      ]).exec();
      const goal = result[0].totalPrice;
      const totalProfit = goal * 0.15;
      const cusResult = await Order.aggregate([
        {
          $match: {
            sellerId: bankAccount
          }
        },
        {
          $group: {
            _id: '$sellerId',
            totalCustomers: { $addToSet: '$userId' }
          }
        },
        {
          $project: {
            _id: 0,
            totalCustomers: { $size: '$totalCustomers' }
          }
        }
      ]).exec();
        const totalCustomers = cusResult[0].totalCustomers;
      const orderCount = await Order.countDocuments({ sellerId: bankAccount });
      res.status(200).json({ goal, totalProfit, totalCustomers, orderCount });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
