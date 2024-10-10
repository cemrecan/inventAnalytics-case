import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";
import { utils } from "../utils";

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

    if (user) {
      const pastBorrowingsArray = await utils.findUserPastBorrowings(id);
      const currentlyBorrowedArray = await utils.findUserCurrentBorrowings(id);

      const userObject = {
        name: user.name,
        pastBorrowings: pastBorrowingsArray,
        currentlyBorrowed: currentlyBorrowedArray,
      };
      return userObject;
    }

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
