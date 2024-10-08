import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    name: String,
    description: String,
    price: Number
});

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;