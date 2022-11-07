import Joi from "joi";

export const VehicleSchema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().required().min(1900).max(new Date().getFullYear()),
})

export const VehicleGetQueryParamsSchema = Joi.object({
    make: Joi.string(),
    model: Joi.string(),
    year: Joi.number().min(1900).max(new Date().getFullYear()),
})
