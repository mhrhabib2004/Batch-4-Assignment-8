
import { ServiceRecord, ServiceStatus } from "../../../../generated/prisma";
import AppError from "../../../errors/AppError";
import prisma from "../../utils/prisma";
import httpStatus from "http-status";




// Create Service
const createServiceIntoDB = async (req: any): Promise<ServiceRecord> => {


    const result = await prisma.$transaction(async (transactionClient: any) => {

        const bike = await prisma.bike.findUnique({
            where: {
                bikeId: req.body.bikeId
            }
        })

        if (!bike) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Bike ID not found');
        }

        const createdServiceData = await (transactionClient as any).ServiceRecord.create({
            data: req.body
        });

        return createdServiceData;
    });
    return result;
};


// Get All Service
const getAllServiceFromDB = async (): Promise<ServiceRecord[]> => {
    return await prisma.serviceRecord.findMany();
}


// get Service by ID
const getByServiceIdFromDB = async (serviceId: string): Promise<ServiceRecord | null> => {
    const result = await prisma.serviceRecord.findUnique({
        where: {
            serviceId
        }
    })

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Service Record ID not found');
    }

    return result;
};


// Update service
const completeServiceInDB = async (serviceId: string, payload: { completionDate?: string }): Promise<ServiceRecord> => {

    await prisma.serviceRecord.findUniqueOrThrow({
        where: { serviceId }
    });

    const completionDate = payload.completionDate
        ? new Date(payload.completionDate)
        : new Date();

    const result = await prisma.serviceRecord.update({
        where: { serviceId },
        data: {
            completionDate,
            status: 'done'
        }
    });

    return result;
};


// service data befor 7 days and filter panding & in_progress
const getPendingOrOverdueServicesInBD = async (): Promise<ServiceRecord[]> => {

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const services = await prisma.serviceRecord.findMany({
        where: {
            AND: [
                {
                    status: {
                        in: ['pending', 'in_progress'] as ServiceStatus[]
                    }
                },
                {
                    serviceDate: {
                        lt: sevenDaysAgo
                    }
                }
            ]
        },
        orderBy: {
            serviceDate: 'asc'
        }
    });

    return services;
};




export const recordService = {
    createServiceIntoDB,
    getAllServiceFromDB,
    getByServiceIdFromDB,
    completeServiceInDB,
    getPendingOrOverdueServicesInBD
}