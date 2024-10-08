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
  } catch (error) {
    console.error("Error borrowing books:", error);
    res.status(500).json({ error: "Failed to borrow books" });
  }
};

export const borrowingController = { borrowBook };
