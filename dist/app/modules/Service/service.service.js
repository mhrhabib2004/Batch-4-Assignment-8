"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const http_status_1 = __importDefault(require("http-status"));
// Create Service
const createServiceIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const bike = yield prisma_1.default.bike.findUnique({
            where: {
                bikeId: req.body.bikeId
            }
        });
        if (!bike) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike ID not found');
        }
        const createdServiceData = yield transactionClient.ServiceRecord.create({
            data: req.body
        });
        return createdServiceData;
    }));
    return result;
});
// Get All Service
const getAllServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.serviceRecord.findMany();
});
// get Service by ID
const getByServiceIdFromDB = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId
        }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Service Record ID not found');
    }
    return result;
});
// Update service
const completeServiceInDB = (serviceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.serviceRecord.findUniqueOrThrow({
        where: { serviceId }
    });
    const completionDate = payload.completionDate
        ? new Date(payload.completionDate)
        : new Date();
    const result = yield prisma_1.default.serviceRecord.update({
        where: { serviceId },
        data: {
            completionDate,
            status: 'done'
        }
    });
    return result;
});
// service data befor 7 days and filter panding & in_progress
const getPendingOrOverdueServicesInBD = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const services = yield prisma_1.default.serviceRecord.findMany({
        where: {
            AND: [
                {
                    status: {
                        in: ['pending', 'in_progress']
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
});
exports.recordService = {
    createServiceIntoDB,
    getAllServiceFromDB,
    getByServiceIdFromDB,
    completeServiceInDB,
    getPendingOrOverdueServicesInBD
};
