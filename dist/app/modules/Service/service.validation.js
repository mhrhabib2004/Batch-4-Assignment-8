"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceValidation = void 0;
const zod_1 = require("zod");
// Create bike validation schema
const createServiceValidation = zod_1.z.object({
    body: zod_1.z.object({
        bikeId: zod_1.z.string({
            required_error: "BikeId is required!"
        }).min(1, "Brand cannot be empty"),
        serviceDate: zod_1.z.string(),
        description: zod_1.z.string(),
        completionDate: zod_1.z.date().optional()
    })
});
exports.serviceValidation = {
    createServiceValidation
};
