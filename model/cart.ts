import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true // Ensure cart is linked to a user
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1 // prevent 0 or negative values
            }
        }
    ],
    totalPrice: { type: Number }

}, {
    timestamps: true
});

export const Cart = mongoose.model("Cart", cartSchema);
