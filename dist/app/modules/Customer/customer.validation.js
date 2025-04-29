"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidation = void 0;
const zod_1 = require("zod");
// Create customer validation
const createCustomerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!"
        }),
        email: zod_1.z.string({
            required_error: "Email is required!"
        }).email("Invalid email format"),
        phone: zod_1.z.string({
            required_error: "Contact Number is required!"
        }).min(11, "Phone number must be at least 11 characters")
    })
});
// Update validation
const updateCustomerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional()
    })
});
exports.customerValidation = {
    createCustomerValidation,
    updateCustomerValidation
};
