import { Request, Response } from 'express';
import { userService } from '../services/userService';

const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  export const userController = { getAllUsers };