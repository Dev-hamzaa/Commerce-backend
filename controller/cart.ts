import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import mongoose from "mongoose";

const createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return errorHandler(400, "Please provide the user id", next)
        }
        const createCart = await Cart.create({
            userId: userId
        })
        if (createCart) {
            return res.status(200).json({
                success: true,
                message: "Cart created successfully",
                data: createCart
            })
        }
        return errorHandler(400, "Cart not created", next)
    } catch (err) {
        return errorHandler(500, 'internal server error', next)
    }
}
const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId) {
            return errorHandler(400, "Please provide the user id and products", next)
        }
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const exsistingItem = cart.products.find(p => p.productId === productId)
        if (exsistingItem) {
            exsistingItem.quantity += quantity
        }
        else {
            cart.products.push({ productId: productId, quantity: quantity, })
        }
        await cart.save();
        return res.status(200).json({ message: "Product updated in cart", data: cart });


    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}
const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, productId } = req.body;

    try {
        // 1. Get the cart
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const initialLength = cart.products.length;

        cart.products.pull({ productId: new mongoose.Types.ObjectId(productId) });

        if (cart.products.length === initialLength) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        return res.status(200).json(
            {
                message: "product removed Successfully"
            }
        )

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


const getUserCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return errorHandler(400, "Please provide the user id", next)
        }
        const userCart = await Cart.findOne({ userId: userId })
        if (userCart) {
            return res.status(200).json({
                success: true,
                message: "Cart fetched successfully",
                data: userCart
            })
        }
        return errorHandler(400, "Cart not found", next)

    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}


export const cartController = {
    createCart,
    getUserCart,
    updateCart,
    removeFromCart

}