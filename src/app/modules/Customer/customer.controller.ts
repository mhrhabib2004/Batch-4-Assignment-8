
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { customerService } from "./customer.sevice";


// Create customer
const createCustomer = catchAsync(async (req: Request, res: Response) => {

    const result = await customerService.createCustomerIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Customer Created successfuly!",
        data: result
    })
});


// get all Customer
const getAllCustomer = catchAsync(async (req: Request, res: Response) => {

    const result = await customerService.getAllCustomerFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Customers fetched successfully',
        data: result,
    });
});


// get customer by ID
const getByCustomerId = catchAsync(async (req: Request, res: Response) => {
    const { customerId } = req.params;

    const result = await customerService.getByCustomerIdFromDB(customerId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer fetched successfully",
        data: result
    });
})


// Update customer
const updateCustomer = catchAsync(async (req: Request, res: Response) => {
    const { customerId } = req.params;

    const result = await customerService.updateCustomerIntoDB(customerId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer updated successfully",
        data: result
    })
})


// Delete Customer
const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
    const { customerId } = req.params;

    await customerService.deleteCustomerFromDB(customerId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer deleted successfully",
        data: null
    })
})


export const customerController = {
    createCustomer,
    getAllCustomer,
    getByCustomerId,
    updateCustomer,
    deleteCustomer

}