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

export const cartController = {
    createCart
}