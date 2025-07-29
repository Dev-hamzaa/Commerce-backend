import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { Cart } from "../model/cart";

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
        const { userId, products } = req.body;
        if (!userId || !products) {
            return errorHandler(400, "Please provide the user id and products", next)
        }
        const updatedCart = await Cart.findByIdAndUpdate(
            {
                _id: id
            },
            {
                userId: userId,
                products: products
            },
            {
                new: true
            }
        )
        if (updatedCart) {
            return res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                data: updatedCart
            })
        }
        return errorHandler(400, "Cart not updated", next)
    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}

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
    updateCart
}