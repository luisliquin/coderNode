import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    id: Number,
    products: {
        productId: Number,
        quantity: Number
      }
})

export const userModel = mongoose.model(cartCollection, cartSchema);