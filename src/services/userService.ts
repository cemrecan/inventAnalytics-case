import { AppDataSource } from '../../ormconfig'; 
import { User } from '../entities/User';

const getAllUsers = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return users;
  };

export const userService = { getAllUsers };