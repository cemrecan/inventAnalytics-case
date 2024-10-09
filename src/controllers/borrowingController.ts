import { Request, Response } from "express";
import { borrowingService } from "../services/borrowingService";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const book_id = req.params.book_id;

    const borrowing = await borrowingService.borrowBook(
      parseInt(user_id, 10),
      parseInt(book_id, 10)
    );
    res.json(borrowing);
  } catch (err) {
    console.error("Error borrowing books:", err);
    res.status(500).json({ error: "Failed to borrow books" });
  }
};

const returnBook = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const book_id = req.params.book_id;
    const user_score = req.body.score;

    const returned = await borrowingService.returnBook(
      parseInt(user_id, 10),
      parseInt(book_id, 10),
      user_score
    );

    if (typeof returned === "string") {
      res.status(404).json(returned);
    } else {
      res.json(returned);
    }
  } catch (err) {
    console.error("Error returning books:", err);
    res.status(500).json({ error: "Failed to return books" });
  }
};

export const borrowingController = { borrowBook, returnBook };
