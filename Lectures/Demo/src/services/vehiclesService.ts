import VehicleDto from "../DTO/VehicleDto";
import { UserModel, VehicleModel } from "../config/data-source";

export const getVehiclesService = async () => {
  const vehicles = await VehicleModel.find({
    relations: {
      user: true,
    },
    order: { id: "ASC" },
  });
  return vehicles;
};

//!One to One

// export const createVehiclesService = async (vehicleData: VehicleDto) => {
//   try {
//     const vehicle = await VehicleModel.create(vehicleData);
//     await VehicleModel.save(vehicle);

//     const user = await UserModel.findOneBy({
//       id: vehicleData.userId,
//     });
//     if (user) {
//       user.vehicle = vehicle;
//       UserModel.save(user);
//     } else {
//       throw Error("The user does not exist");
//     }
//     return vehicle;
//   } catch (error) {
//     console.error("Error creating vehicle:", error);
//     throw new Error("Failed to create vehicle");
//   }
// };

export const createVehiclesService = async (vehicleData: VehicleDto) => {
  try {
    const user = await UserModel.findOne({ where: { id: vehicleData.userId } });

    if (!user) {
      throw new Error("The user does not exist");
    }
    const newVehicle = await VehicleModel.create(vehicleData);
    newVehicle.user = user;
    await VehicleModel.save(newVehicle);

    return newVehicle;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Failed to create vehicle");
  }
};

export const getVehicleById = async (id: number) => {
  try {
    const vehicle = await VehicleModel.findOne({ where: { id } });

    if (vehicle) {
      return { success: true, vehicle };
    } else {
      return { success: false, message: `Vehicle with ID ${id} not found` };
    }
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return { success: false, message: "Error fetching vehicle" };
  }
};

export const deleteVehicleById = async (id: number) => {
  try {
    const deleteResult = await VehicleModel.delete(id);

    if (deleteResult.affected === 1) {
      return {
        success: true,
        message: `Vehicle with the ID ${id} has been deleted`,
      };
    } else {
      return { success: false, message: `car with the ID ${id} was not found` };
    }
  } catch (error) {
    console.error("There was an error deleting the vehicle", error);
    return {
      success: false,
      message: "There was an error deleting the vehicle",
    };
  }
};
