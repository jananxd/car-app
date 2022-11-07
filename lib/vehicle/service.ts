import mongoClient from "../db";
import { Vehicle } from "./model";
import { Filter, ObjectId, OptionalUnlessRequiredId } from "mongodb";

const vehiclesCollection = mongoClient.db.collection<Vehicle>("vehicles");

export const getVehicles = async (fields: Filter<Vehicle>): Promise<Vehicle[]> => {
    return vehiclesCollection.find(fields).toArray()
}

export const getVehicle = async (_id: ObjectId): Promise<Vehicle | null> => {
    return vehiclesCollection.findOne({_id});
}

export const createVehicle = async (vehicle: Omit<Vehicle, "_id">): Promise<Vehicle> => {
    const { insertedId } = await vehiclesCollection.insertOne(vehicle as OptionalUnlessRequiredId<Vehicle>);
    return {_id: insertedId, ...vehicle}
}

export const updateVehicle = async (vehicle: Vehicle): Promise<boolean> => {
    const result = await mongoClient.db.collection("vehicles").updateOne({_id: vehicle._id}, {$set: vehicle});

    return result.acknowledged && result.matchedCount === 1
}
