import express from "express";
import { userController } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:id", userController.getUserInfo);
userRouter.post("/users", userController.createUser);

export default userRouter;
