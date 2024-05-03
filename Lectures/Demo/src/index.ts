import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Connection has been established");
  app.listen(PORT, () => {
    console.log(`Server listening through the port ${PORT}`);
  });
});
