import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  spec: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
