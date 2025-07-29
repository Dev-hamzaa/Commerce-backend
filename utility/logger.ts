import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middleware/errorHandler";

export const logger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    // Listen for when the response has finished
    res.on("finish", () => {
        const duration = Date.now() - start;
        const log = [
            `Origin: ${req.hostname}`,
            `Method: ${req.method}`,
            `URL: ${req.originalUrl}`,
            `Status: ${res.statusCode}`,
            `Time: ${duration}ms`
        ].join(" | ");

        console.log(log);
    });

    try {
        next();
    } catch (err) {
        errorHandler(500, "Internal Server Error", next);
    }
};
