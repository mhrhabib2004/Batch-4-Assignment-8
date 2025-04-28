


import { z } from "zod";

// Create bike validation schema
const createServiceValidation = z.object({

    body: z.object({
        bikeId: z.string({
            required_error: "BikeId is required!"
        }).min(1, "Brand cannot be empty"),

        serviceDate: z.string(),

        description: z.string(),

        completionDate: z.date().optional()
    })
});

export const serviceValidation = {
    createServiceValidation
};