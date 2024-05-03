import { Router } from "express";
import { getUsersController, createUserController, getUsersControllerById } from "../controllers/usersControllers";

const userRouter: Router = Router();

userRouter.get("/", getUsersController);
userRouter.get("/:id", getUsersControllerById)
userRouter.post("/",createUserController );


export default userRouter
