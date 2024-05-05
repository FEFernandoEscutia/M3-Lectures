import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../entities/Vehicles";

const VehicleRepository = AppDataSource.getRepository(Vehicle);

export default VehicleRepository;
