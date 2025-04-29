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
exports.bikeService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
// Create Bike
const createBikeIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const customer = yield prisma_1.default.customer.findUnique({
            where: {
                customerId: req.body.customerId
            }
        });
        if (!customer) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Customer ID not found');
        }
        const createdBikeData = yield transactionClient.bike.create({
            data: req.body
        });
        return createdBikeData;
    }));
    return result;
});
// Get All Bike
const getAllBikeFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.bike.findMany();
});
// get Bike by ID
const getByBikeIdFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.findUnique({
        where: {
            bikeId
        }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike ID not found');
    }
    return result;
});
// Delete Bike
const deleteBikeFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bike.delete({
        where: {
            bikeId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike ID not found');
    }
    return result;
});
exports.bikeService = {
    createBikeIntoDB,
    getAllBikeFromDB,
    getByBikeIdFromDB,
    deleteBikeFromDB
};
