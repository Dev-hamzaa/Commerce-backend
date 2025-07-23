// middlewares/errorHandler.ts
import { NextFunction, Request, Response } from 'express';


interface ErrorWithStatusCode extends Error {
    statusCode?: number
}
export const errorHandler = (
    statusCode: number,
    message: string,
    next: NextFunction,
): void => {
    const error: any = new Error(message)
    error.statusCode = statusCode
    next(error)
}

export const errorMiddleware = (
    err: ErrorWithStatusCode,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const statusCode: number = err.statusCode || 500
    const message: string = err.message || 'Internal Server Error'

    console.error(`Error ${statusCode}: ${message}`)

    const response: { status: string; message: string; stack?: string } = {
        status: 'failed',
        message,
    }

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack
    }

    res.status(statusCode).json(response)
}

