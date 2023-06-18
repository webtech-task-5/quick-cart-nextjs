import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import User from "models/User";
import Order from "models/Order";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect();
  const method = req.method;
  const id = req.query.id;
  const type = req.query.type;
  if (method == "GET" && type == "seller") {
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
      if (result.length == 0)
        return res
          .status(200)
          .json({ goal: 0, totalProfit: 0, totalCustomers: 0, orderCount: 0 });
      const goal = result[0].totalPrice;
      const totalProfit = goal * 0.15;
      const cusResult = await Order.aggregate([
        {
          $match: {
            sellerId: bankAccount,,
          },,
        },
        {
          $group: {
            _id: "$sellerId",
            totalCustomers: { $addToSet: "$userId" },
          },
            _id: "$sellerId",
            totalCustomers: { $addToSet: "$userId" },
          },
        },
        {
          $project: {
            _id: 0,
            totalCustomers: { $size: "$totalCustomers" },
          },
        },
            totalCustomers: { $size: "$totalCustomers" },
          },
        },
      ]).exec();
      let totalCustomers;
      if (cusResult.length == 0) {
      totalCustomers = 0;
      } else {
        totalCustomers = cusResult[0].totalCustomers;
      }

      const orderCount = await Order.countDocuments({ sellerId: bankAccount });
      res.status(200).json({ goal, totalProfit, totalCustomers, orderCount });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  if (method == "GET" && type == "customer") {
    try {
      const orderCount = await Order.countDocuments({ userId: id });
      const seller = await Order.countDocuments({ userId: id }).distinct(
        "sellerId"
      );
      const totalSeller = seller.length;
      const result = await Order.aggregate([
        {
          $match: {
            userId: id,
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
            _id: "$userId",
            totalSpend: {
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

      console.log(result);
      let totalSpentAmount;
      if (result.length == 0) {
        totalSpentAmount = 0;
      } else {
        totalSpentAmount = result[0].totalSpend;
      }
      res.status(200).json({ orderCount, totalSpentAmount, totalSeller });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
