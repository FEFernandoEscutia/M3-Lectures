import { Router } from "express";
import {
  createVehicleController,
  deleteVehicleByIdController,
  getVehicleByIdController,
  getVehicleController,
} from "../controllers/vehiclesControllers";

export const vehicleRouter = Router();

vehicleRouter.get("/", getVehicleController);
vehicleRouter.post("/", createVehicleController);
vehicleRouter.post("/delete/:id", deleteVehicleByIdController);
vehicleRouter.get("/:id", getVehicleByIdController);
// vehicleRouter.get("/:id", getVehiclesControllerById)
// vehicleRouter.post("/",createVehiclesController );
