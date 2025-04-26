import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../app/config";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let errorDetails = err;

    if (err instanceof PrismaClientValidationError) {
        message = 'Validation Error';
        errorDetails = err.message;
    }
    else if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = "Duplicate Key error";
            errorDetails = err.meta;
        }
    }

    res.status(statusCode).json({
        success,
        message,
        errorDetails,
        stack: config.env === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;