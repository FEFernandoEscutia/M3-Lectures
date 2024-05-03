import UserDto from "../DTO/UserDto";
import { UserModel } from "../config/data-source";

export const getUsersService = async () => {
  const users = await UserModel.find({
    relations :{
      vehicles: true
    },
    order: { id: "ASC" },
  });
  
  return users;
};

export const createUserService = async (userData: UserDto) => {
  const user = await UserModel.create(userData);
  const result = await UserModel.save(user);
  return user;
};

export const getUserById = async (id: number) => {
  const user = await UserModel.findOneBy({
    id
  });

  return user;
};
