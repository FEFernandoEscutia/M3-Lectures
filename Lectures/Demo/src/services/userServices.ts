import UserDto from "../DTO/UserDto";
import UserRepository from "../repositories/UserRepository";

export const getUsersService = async () => {
  const users = await UserRepository.find({
    relations :{
      vehicles: true
    },
  });
  
  return users;
};

export const createUserService = async (userData: UserDto) => {
  const user = await UserRepository.create(userData);
  const result = await UserRepository.save(user);
  return user;
};

export const getUserById = async (id: number) => {
  const user = await UserRepository.findOneBy({
    id
  });

  return user;
};
