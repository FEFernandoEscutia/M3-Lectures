import { Request, Response } from "express";
import IVehicle from "../interfaces/IVehicle";
import {
  createVehiclesService,
  deleteVehicleById,
  getVehicleById,
  getVehiclesService,
} from "../services/vehiclesService";
import { Vehicle } from "../entities/Vehicles";

export const getVehicleController = async (req: Request, res: Response) => {
  try {
    const vehicles: Vehicle[] = await getVehiclesService();
    res.status(200).json({ vehicles: vehicles });
  } catch (error) {
    console.log("error while getting vehicles");

    res.json({ message: "error while getting vehicles" });
  }
};

export const createVehicleController = async (req: Request, res: Response) => {
  try {
    const { brand, color, model, year, userId } = req.body;
    const vehicle: Vehicle = await createVehiclesService({
      brand,
      color,
      model,
      year,
      userId,
    });
    res.status(200).json(vehicle);
  } catch (error) {
    console.log("error while creating a new vehicle");

    res.json({ message: "error while creating a new vehicle the user does not exist or there is some missing" });
  }
};

export const getVehicleByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getVehicleById(Number(id));
    res.status(200).json(result);
  } catch (error) {
    console.log("error while getting the  vehicle");

    res.json({ message: "error while getting the  vehicle" });
  }
};

export const deleteVehicleByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const deletionResult = await deleteVehicleById(Number(id));
    res
      .status(200)
      .json({
        deletionResult,
        message: `the vehicle with ID ${id} has been deleted`,
      });
  } catch (error) {
    console.log("error while getting the  vehicle");

    res.json({ message: "error while getting the  vehicle" });
  }
};
