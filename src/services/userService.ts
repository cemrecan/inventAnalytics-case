import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";

const getAllUsers = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  return users;
};

const getUserInfo = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOneBy({ id });
    // TODO: Details will be check after all implementation
    return user;
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};

const createUser = async (name: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create({ name });
  return await userRepository.save(newUser);
};

export const userService = { getAllUsers, getUserInfo, createUser };
