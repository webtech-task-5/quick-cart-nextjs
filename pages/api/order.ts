import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../libs/dbConnect";
import User from "../../models/User";
import Order from "../../models/Order";
import Product from "../../models/Product";
import axios from "axios";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  const method = req.method;
  if (method == "POST") {
    try {
      const { userId, cartItems, total, deliveryAddress } = req.body;
      // check if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(500).json({
          error: "User not found",
        });
      }
      const cart = cartItems.map((item: any) => {
        return {
          amount: item.count * item.price,
          sellerId: item.sellerId,
        };
      });
      console.log(cartItems);

      const data = {
        userId,
        bankAccountNumber: user.bankAccount,
        apiKey: user.apiKey,
        seller: cart,
        total,
      };
      const resBank = await axios.post(
        `http://localhost:3001/api/checkBalance`,
        data
      );
      if (resBank.status != 200) {
        return res.status(500).json({
          error: resBank.data.error,
        });
      }
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const newOrder = new Order({
          userId,
          productId: item.id,
          quantity: item.count,
          sellerId: item.sellerId,
          status: "Pending",
          address: deliveryAddress.address,
          city: deliveryAddress.city,
          zip: deliveryAddress.zip,
          country: deliveryAddress.country,
        });
        await newOrder.save();
      }

      res.status(200).json({ message: "Order created successfully" });
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  } else if (method == "GET") {
    try {
      const { bankId, type } = req.query;
      const orders = await Order.find({
        sellerId: bankId,
      }).populate({
        path: "productId",
        model: "Product",
      });
      res.status(200).json(orders);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong",
      });
    }
  } else if (method == "PUT") {
    const { id, type } = req.query;
    let order = await Order.findById(id).populate({
      path: "productId",
      model: "Product",
    });
    if (!order) {
      return res.status(500).json({
        error: "Order not found",
      });
    }
    order.status = type;
    await order.save();
    if (type == "Accepted") {
      const bankAccount = await User.findById(order.userId);
      // link in localhost:3001/api/transfer
      const api = "http://localhost:3001/api/transfer";
      const resBank = await axios.post(api, {
        sellerId: order.sellerId,
        amount: parseInt(order.quantity) * parseInt(order.productId.price),
        bankAccountNumber: bankAccount.bankAccount,
        apiKey: bankAccount.apiKey,
      });
      if (resBank.status != 200) {
        return res.status(500).json({
          error: resBank.data.error,
        });
      }
    }
    if (type == "Rejected") {
      const bankAccount = await User.findById(order.userId);
      const api = "http://localhost:3001/api/transferback";
      const resBank = await axios.post(api, {
        sellerId: order.sellerId,
        amount: parseInt(order.quantity) * parseInt(order.productId.price),
        bankAccountNumber: bankAccount.bankAccount,
        apiKey: bankAccount.apiKey,
      });
      if (resBank.status != 200) {
        return res.status(500).json({
          error: resBank.data.error,
        });
      }
    }
    if (type == "Delivered") {
      order.status = "Delivered";
      await order.save();
    }
    res.status(200).json({ message: "Order updated successfully" });
  }
};
