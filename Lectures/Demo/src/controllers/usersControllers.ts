import { Request, Response } from "express";
import {
  createUserService,
  getUserById,
  getUsersService,
} from "../services/userServices";
import { User } from "../entities/User";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users: User[] = await getUsersService();
    res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, active, age } = req.body;
  const newUser: User = await createUserService({ name, email, active, age });
  res.status(200).json(newUser);
};

export const getUsersControllerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user: User | null =await getUserById(Number(id));
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};
