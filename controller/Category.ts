import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { Category } from "../model/category";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Please provide the category name",

                }
            )
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Category already exists"
                }
            )
        }

        const category = await Category.create({ name });

        return res.json(
            {
                success: true,
                message: "Created Successfuly",
                data: category
            }
        )
    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        return res.json({
            success: true,
            message: "Category found",
            data: category
        })
    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find();
        return res.json({
            success: true,
            message: "Categories found",
            data: categories
        })
    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}


const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        return res.json({
            success: true,
            message: "Category updated",
            data: category
        })
    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        return res.json({
            success: true,
            message: "Category deleted",
            data: category
        })
    } catch (error) {
        return errorHandler(500, "internal server Error", next)
    }
}


export const categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}