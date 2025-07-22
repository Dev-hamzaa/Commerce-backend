import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { baseCreate } from "../services/baseActions";
import { User } from "../model/user";
import jwt from 'jsonwebtoken';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {

        }
        const { success, data } = await baseCreate(User, req.body)
        if (success) {
            res.status(201).json({
                success: true,
                data: data,
            });
        }
        else {
            res.status(400).json({
                success: false,
                data: data,
            });
        }
    } catch (error: any) {

    }
}

const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please provide email and password"
                }
            )
        }
        const user = await User.findOne({ email }).select("+password");
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" })
            res.status(200).json({
                success: true,
                message: "Login Successfully",
                token: token,
            });
        }
    } catch (error) {

    }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {

    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {

    }
}


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user,
        });
    } catch (error) {

    }
}