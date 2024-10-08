import express from "express";
import { bookController } from "../controllers/bookController";

const bookRouter = express.Router();

bookRouter.get("/", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookInfo);
bookRouter.post("/", bookController.createBook);

export default bookRouter;
