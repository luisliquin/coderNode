import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    code: {type: String},
    price: {type: Number},
    status: {type: Number},
    thumbnails: {type: Array},
    stock: {type: Number},
    category: {type: String}
});

    const productModel = mongoose.model(productCollection, productSchema);
export default productModel;
