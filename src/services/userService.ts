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
    const user = await userRepository.findOne({
      relations: {
        borrowings: {
          book: true,
        },
      },
      where: {
        id: id,
      },
    });
    //TODO: improve user response with only (name, books borrowed in the past with their user scores, and currently borrowed books information
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
