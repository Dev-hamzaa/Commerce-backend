import { errorHandler } from './../middleware/errorHandler';
import { NextFunction, Request, Response } from "express";
import { baseCreate, baseDelete, baseUpdate } from "../services/baseActions";
import { Product } from "../model/product";




const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { name, price, description, category, images } = req.body;
        const { success, data } = await baseCreate(Product, req.body);

        if (!category || !name || !price) {
            return res.status(400).json(
                {
                    success: false,
                    mesage: "Please provide required Filelds"
                }
            )
        }
        if (req.files) {
            //Handle the File uploading to the s3
        }
        if (success) {
            return res.status(201).json({
                success: true,
                data: data,
            });
        }

    } catch (error) {
        console.error(error)
        return errorHandler(500, 'internal servor Error', next)
    }
}


const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { success, data } = await baseDelete(Product, id)
        if (success) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
                data: data,
            });
        }
    } catch (error) {
        console.error(error)
        return errorHandler(500, "internal server Error", next);
    }
}


const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const updateProduct = await Product.findByIdAndUpdate(
            {
                _id: id
            },
            {
                body
            },
            { new: true }
        )

        return res.status(200).json(

            {
                success: true,
                message: "Product Updated Successfully",
                data: updateProduct
            }
        )
    } catch (error) {

        console.error(error)
        return errorHandler(500, "internal server Error", next);
    }
}

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(
            {
                _id: id
            }
        )
        if (!foundProduct) {
            return errorHandler(404, "Product not found", next)
        }
        return res.status(200).json(
            {
                success: true,
                message: "Product Found",
                data: foundProduct
            }
        )
    } catch (error) {
        console.error(error)
        return errorHandler(500, "internal server Error", next);
    }
}

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allProducts = await Product.find();

        if (allProducts.length == 0) {
            return errorHandler(404, "No Products Found", next)
        }
        if (allProducts.length > 0) {
            return res.status(200).json(
                {
                    success: true,
                    message: "All Products",
                    data: allProducts
                }

            )
        }
    } catch (error) {
        console.error(error)
        return errorHandler(500, "internal server Error", next);
    }
}



export const productController = {
    createProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getAllProducts
}