import { Request, Response, request } from "express";
import { userService } from "../services/userService";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserInfo(parseInt(userId, 10));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const userName = req.body.name;
    const user = userService.createUser(userName);
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to cerate user" });
  }
};

export const userController = { getAllUsers, getUserInfo, createUser };
