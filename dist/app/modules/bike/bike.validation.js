"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidation = void 0;
const zod_1 = require("zod");
// Create bike validation schema
const createBikeValidation = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string({
            required_error: "Brand is required!"
        }).min(1, "Brand cannot be empty"),
        model: zod_1.z.string({
            required_error: "Model is required!"
        }).min(1, "Model cannot be empty"),
        year: zod_1.z.number({
            required_error: "Year is required!"
        }).int().min(1900, "Year must be after 1900")
            .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
    })
});
exports.bikeValidation = {
    createBikeValidation
};
