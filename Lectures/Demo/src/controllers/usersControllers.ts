import { Request, Response } from "express";
import {
  createUserService,
  getUserById,
  getUsersService,
} from "../services/userServices";
import IUser from "../interfaces/IUser";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await getUsersService();
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, active, age } = req.body;
  const newUser: IUser = await createUserService({ name, email, active, age });
  res.status(200).json(newUser);
};

export const getUsersControllerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: IUser | null =await getUserById(Number(id));
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};
