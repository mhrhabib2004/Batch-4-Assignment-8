

import { Request } from "express";
import httpStatus from "http-status";
import prisma from "../../utils/prisma";
import AppError from "../../errors/AppError";
import { Bike } from "@prisma/client";


// Create Bike
const createBikeIntoDB = async (req: Request): Promise<Bike> => {

    const result = await prisma.$transaction(async (transactionClient) => {

        const customer = await prisma.customer.findUnique({
            where: {
                customerId: req.body.customerId
            }
        })

        if (!customer) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Customer ID not found');
        }

        const createdBikeData = await (transactionClient as any).bike.create({
            data: req.body
        });

        return createdBikeData;
    });
    return result;
};


// Get All Bike
const getAllBikeFromDB = async (): Promise<Bike[]> => {
    return await prisma.bike.findMany();
}


// get Bike by ID
const getByBikeIdFromDB = async (bikeId: string): Promise<Bike | null> => {
    const result = await prisma.bike.findUnique({
        where: {
            bikeId
        }
    })

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bike ID not found');
    }

    return result;
};


// Delete Bike
const deleteBikeFromDB = async (bikeId: string): Promise<Bike> => {

    const result = await prisma.bike.delete({
        where: {
            bikeId,
        },
    });

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bike ID not found');
    }

    return result;
};



export const bikeService = {
    createBikeIntoDB,
    getAllBikeFromDB,
    getByBikeIdFromDB,
    deleteBikeFromDB
}