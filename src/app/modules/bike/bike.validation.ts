
import { z } from "zod";

// Create bike validation schema
const createBikeValidation = z.object({

    body: z.object({
        brand: z.string({
            required_error: "Brand is required!"
        }).min(1, "Brand cannot be empty"),

        model: z.string({
            required_error: "Model is required!"
        }).min(1, "Model cannot be empty"),

        year: z.number({
            required_error: "Year is required!"
        }).int().min(1900, "Year must be after 1900")
            .max(new Date().getFullYear() + 1, "Year cannot be in the future"),
    })
});

export const bikeValidation = {
    createBikeValidation
};