import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  sellerId: {
    type: "String",
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
