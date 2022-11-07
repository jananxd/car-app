import express from "express";
import { ObjectId } from "mongodb";
import Joi, { ValidationError } from "joi";

export type DecoratorFunc = (req: express.Request, res: express.Response, next: express.NextFunction) => void

export const checkVehicleId: DecoratorFunc = (req, res, next) => {
    const vehicleId = req.params.id

    if (!ObjectId.isValid(vehicleId)) {
        return res.status(400).json({message: "Invalid vehicle id"})
    }

    next()
}

export const validatePayload = (schema: Joi.Schema): DecoratorFunc => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body)
        } catch (error) {
            const errors = (error as ValidationError).details.map(detail => detail.message)
            return res.status(422).json({ errors })
        }

        next()
    }
}

export const validateQueryParams = (schema: Joi.Schema): DecoratorFunc => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.query)
        } catch (error) {
            const errors = (error as ValidationError).details.map(detail => detail.message)
            return res.status(422).json({ errors })
        }

        next()
    }
}
