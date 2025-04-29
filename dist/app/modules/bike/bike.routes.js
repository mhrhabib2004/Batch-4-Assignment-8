"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("../bike/bike.controller");
const validateRequest_1 = __importDefault(require("../../utils/validateRequest"));
const bike_validation_1 = require("../bike/bike.validation");
const router = express_1.default.Router();
// Create bike route
router.post("/", (0, validateRequest_1.default)(bike_validation_1.bikeValidation.createBikeValidation), bike_controller_1.bikeController.createBike);
// get all Bike route
router.get('/', bike_controller_1.bikeController.getAllBike);
// get bike ID 
router.get('/:bikeId', bike_controller_1.bikeController.getByBikeId);
// Delete Bike route
router.delete('/:bikeId', bike_controller_1.bikeController.deleteBike);
exports.bikeRoutes = router;
