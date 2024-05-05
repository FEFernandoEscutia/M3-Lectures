import { query } from "express";
import VehicleDto from "../DTO/VehicleDto";
import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../entities/Vehicles";
import VehicleRepository from "../repositories/VehicleRepository";
import UserRepository from "../repositories/UserRepository";

export const getVehiclesService = async () => {
  const vehicles = await VehicleRepository.find({
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
//     const vehicle = await VehicleRepository.create(vehicleData);
//     await VehicleRepository.save(vehicle);

//     const user = await UserRepository.findOneBy({
//       id: vehicleData.userId,
//     });
//     if (user) {
//       user.vehicle = vehicle;
//       UserRepository.save(user);
//     } else {
//       throw Error("The user does not exist");
//     }
//     return vehicle;
//   } catch (error) {
//     console.error("Error creating vehicle:", error);
//     throw new Error("Failed to create vehicle");
//   }
// };

//! Regular way
// export const createVehiclesService = async (vehicleData: VehicleDto) => {
//   try {
//     const user = await UserRepository.findOne({ where: { id: vehicleData.userId } });

//     if (!user) {
//       throw new Error("The user does not exist");
//     }
//     const newVehicle = await VehicleRepository.create(vehicleData);
//     newVehicle.user = user;
//     await VehicleRepository.save(newVehicle);

//     return newVehicle;
//   } catch (error) {
//     console.error("Error creating vehicle:", error);
//     throw new Error("Failed to create vehicle");
//   }
// };

export const createVehiclesService = async (
  vehicleData: VehicleDto
): Promise<Vehicle> => {
  // 1. Create a query runner to handle transactions
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    // 2. Connect the query runner to the database
    await queryRunner.connect();
    queryRunner.startTransaction();
    // 3. Find the user associated with the vehicle
    const user = await UserRepository.findById(vehicleData.userId); // personalized method
    if (!user) {
      throw new Error("The user does not exist");
    }
    // 4. Create a new vehicle instance with the provided data
    const newVehicle = await VehicleRepository.create(vehicleData);

    // 5. Set the relationship between the vehicle and the user
    newVehicle.user = user;

    // 6. Start a transaction to ensure database consistency
    await queryRunner.startTransaction();

    // 7. Save the vehicle to the database within the transaction
    await queryRunner.manager.save(newVehicle);

    // 8. Commit the transaction to apply the changes to the database
    await queryRunner.commitTransaction();

    // 9. Return the successfully created vehicle
    return newVehicle;
  } catch (error) {
    // 10. Handle any errors and re-throw them to be caught by the controller
    console.error("Error creating vehicle:", error);
    queryRunner.rollbackTransaction();
    throw new Error("Failed to create vehicle");
  } finally {
    // 11. Release the query runner regardless of whether the transaction was completed or not
    await queryRunner.release();
  }
};

/*
1. Creación del Query Runner: En entornos de bases de datos,
 especialmente en transacciones complejas o operaciones sensibles, 
 es común utilizar un "query runner" para manejar todas las consultas 
 y transacciones. Esto garantiza un control más preciso sobre las operaciones 
 en la base de datos y ayuda a mantener la consistencia de los datos.

2. Conexión del Query Runner a la Base de Datos: Antes de realizar 
cualquier operación en la base de datos, es necesario establecer una conexión. 
El query runner se conecta a la base de datos para poder ejecutar consultas y transacciones.

3. Inicio de una Transacción: Las transacciones se utilizan para agrupar 
un conjunto de operaciones de base de datos que deben ejecutarse de forma indivisible (atómica).
 Esto garantiza que todas las operaciones se completen con éxito o se reviertan si algo sale mal,
manteniendo la consistencia de los datos.

4. Búsqueda del Usuario Asociado al Vehículo: En este paso, se busca en la base
 de datos el usuario asociado al vehículo que se está creando. Esto es importante
  porque muchos sistemas requieren que ciertos datos estén asociados con otros para
   mantener la integridad referencial de la base de datos.

5. Verificación de la Existencia del Usuario: Antes de continuar, 
se verifica si el usuario asociado al vehículo existe en la base de datos.
 Si no existe, no tiene sentido continuar con la creación del vehículo, 
 ya que necesitaría un propietario válido.

6. Creación de una Nueva Instancia de Vehículo: Aquí se crea una nueva 
instancia de vehículo con los datos proporcionados. Esta es la parte principal 
de la operación donde se crea el objeto que se va a almacenar en la base de datos.

7. Establecimiento de la Relación entre el Vehículo y el Usuario: Se establece 
la relación entre el vehículo recién creado y el usuario asociado encontrado anteriormente. 
Esto puede implicar asignar el ID del usuario al vehículo u otro mecanismo para establecer 
la relación en la base de datos.

8. Guardado del Vehículo en la Base de Datos: Una vez que se ha creado el vehículo 
y se ha establecido la relación con el usuario, se guarda el vehículo en la base de datos.
 Esto se realiza dentro de la transacción para garantizar que la operación sea atómica y consistente.

9. Confirmación de la Transacción: Si todas las operaciones se completan con éxito, 
se confirma la transacción. Esto aplica los cambios a la base de datos de manera permanente
 y los hace visibles para otras partes del sistema.

10. Retorno del Vehículo Creado con Éxito: Si la creación del vehículo se realiza correctamente,
 se devuelve el vehículo recién creado como resultado de la función.
  Esto permite que el controlador o la parte del sistema que llamó a esta función 
  tenga acceso al vehículo para su uso posterior.

11. Manejo de Errores y Reversión de la Transacción: 
Si ocurre algún error durante el proceso de creación del vehículo, se maneja adecuadamente.
 En este caso, se revierte la transacción para deshacer cualquier cambio realizado en la base de datos y restaurar 
 la consistencia de los datos.

12. Liberación del Query Runner: Finalmente, se libera el query runner independientemente
 de si la transacción se completó con éxito o no. Esto es importante para liberar los recursos y
  evitar posibles fugas de memoria o problemas de rendimiento.
*/


export const getVehicleById = async (id: number) => {
  try {
    const vehicle = await VehicleRepository.findOne({ where: { id } });

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
    const deleteResult = await VehicleRepository.delete(id);

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
