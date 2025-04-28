
import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bikeService } from '../bike/bike.sevice';



// Create bike
const createBike = catchAsync(async (req: Request, res: Response) => {

    const result = await bikeService.createBikeIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Bike added successfully",
        data: result
    })
});


// get All Bike
const getAllBike = catchAsync(async (req: Request, res: Response) => {

    const result = await bikeService.getAllBikeFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bikes fetched successfully',
        data: result,
    });
});


// get Bike by ID
const getByBikeId = catchAsync(async (req: Request, res: Response) => {
    const { bikeId } = req.params;

    const result = await bikeService.getByBikeIdFromDB(bikeId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bike fetched successfully",
        data: result
    });
})


// Delete Bike
const deleteBike = catchAsync(async (req: Request, res: Response) => {
    const { bikeId } = req.params;

    await bikeService.deleteBikeFromDB(bikeId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bike deleted successfully",
        data: null
    })
})


export const bikeController = {
    createBike,
    getAllBike,
    getByBikeId,
    deleteBike
}