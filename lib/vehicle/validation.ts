import Joi from "joi";

export const VehicleSchema = Joi.object({
    make: Joi.string().required().max(250),
    model: Joi.string().required().max(250),
    year: Joi.number().required().min(1900).max(new Date().getFullYear()),
})

export const VehicleGetQueryParamsSchema = Joi.object({
    make: Joi.string().max(250),
    model: Joi.string().max(250),
    year: Joi.number().min(1900).max(new Date().getFullYear()),
})
