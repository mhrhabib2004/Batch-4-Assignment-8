

import { Request } from "express";
import prisma from "../../utils/prisma";
import httpStatus from "http-status";
import { Customer } from "../../../../generated/prisma";
import AppError from "../../../errors/AppError";



// create customer
const createCustomerIntoDB = async (req: Request) => {

    const result = await prisma.customer.create({
        data: req.body
    })

    return result;
};


// Get All Customer
const getAllCustomerFromDB = async (): Promise<Customer[]> => {
    return await prisma.customer.findMany();
}


// get customer by ID
const getByCustomerIdFromDB = async (customerId: string): Promise<Customer | null> => {
    const result = await prisma.customer.findUnique({
        where: {
            customerId
        }
    })

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Customer not found');
    }

    return result;
};


// Update Customer
const updateCustomerIntoDB = async (customerId: string, data: Partial<Customer>): Promise<Customer> => {
    await prisma.customer.findUniqueOrThrow({
        where: {
            customerId,
        }
    });

    const result = await prisma.customer.update({
        where: {
            customerId
        },
        data
    });

    return result;
};


// Delete Customer
const deleteCustomerFromDB = async (customerId: string): Promise<Customer> => {

    const result = await prisma.customer.delete({
        where: {
            customerId,
        },
    });

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Customer ID not found');
    }

    return result;
};



export const customerService = {
    createCustomerIntoDB,
    getAllCustomerFromDB,
    getByCustomerIdFromDB,
    updateCustomerIntoDB,
    deleteCustomerFromDB

}


