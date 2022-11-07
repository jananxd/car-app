import { Router } from "express";
import { createVehicle, getVehicle, getVehicles, updateVehicle } from "./service";
import { VehicleGetQueryParamsSchema, VehicleSchema } from "./validation";
import { Filter, ObjectId } from "mongodb";
import { checkVehicleId, validatePayload, validateQueryParams } from "./decorators";
import { Vehicle } from "./model";

const router = Router()

router.get("/", validateQueryParams(VehicleGetQueryParamsSchema), async (req, res) => {
    const filter: Filter<Vehicle> = {}

    if (req.query.make !== undefined) {
        filter.make = req.query.make
    }

    if (req.query.model !== undefined) {
        filter.model = req.query.model
    }

    if (req.query.year !== undefined) {
        filter.year = Number(req.query.year)
    }

    return res.json(await getVehicles(filter))
})

router.get("/:id", checkVehicleId, async (req, res) => {
    const vehicle = await getVehicle(new ObjectId(req.params.id))

    if (vehicle === null) {
        return res.status(404).json({message: "Vehicle not found"})
    }

    res.json(vehicle)
})

router.post("/", validatePayload(VehicleSchema), async (req, res) => {
    try {
        const vehicle = await createVehicle({make: req.body.make, model: req.body.model, year: req.body.year})
        res.status(201).json(vehicle)
    } catch (error) {
        return res.status(400).json("Error creating vehicle")
    }
})

router.put("/:id", checkVehicleId, validatePayload(VehicleSchema), async (req, res) => {
    const vehicleId = new ObjectId(req.params.id)
    const vehicle = await getVehicle(vehicleId)

    if (vehicle === null) {
        return res.status(404).json({message: "Vehicle not found"})
    }

    const newVehicle = {...vehicle, make: req.body.make, model: req.body.model, year: req.body.year}
    const isUpdated = await updateVehicle(newVehicle)

    if (isUpdated) {
        return res.status(200).json(newVehicle)
    }

    return res.status(400).json({message: "Error updating vehicle"})
})

export default router
