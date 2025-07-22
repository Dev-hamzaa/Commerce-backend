// middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    err: any,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    return res.status(status).json({
        success: false,
        status,
        message,
    });
};
