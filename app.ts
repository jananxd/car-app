import dotenv from "dotenv";
dotenv.config();
import express from "express"
import vehicleRoutes from "./lib/vehicle/routes";
import mongoClient from "./lib/db";

const createApp = async () => {
    try {
        await mongoClient.connect()
    } catch (error) {
        console.error("Error connecting to database", error)
    }

    const app = express()
    app.use(express.json())

    app.use("/vehicles", vehicleRoutes)

    app.listen(3000, () => {
        console.log("Server running at port 3000")
    })
}

createApp()
