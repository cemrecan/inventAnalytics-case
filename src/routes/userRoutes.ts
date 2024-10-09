import express from "express";
import { userController } from "../controllers/userController";
import { borrowingController } from "../controllers/borrowingController";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserInfo);
userRouter.post("/", userController.createUser);

userRouter.post("/:user_id/borrow/:book_id", borrowingController.borrowBook);
userRouter.post("/:user_id/return/:book_id", borrowingController.returnBook);

export default userRouter;
