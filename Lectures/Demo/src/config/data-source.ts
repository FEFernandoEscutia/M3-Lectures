import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Vehicle } from "../entities/Vehicles";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fernando",
  password: "Amaterasu1@",
  database: "demo",
  dropSchema: true,    /// for not saving the info in the database
  synchronize: true,
  logging: false,
  entities: [User, Vehicle],
  subscribers: [],
  migrations: [],
});


