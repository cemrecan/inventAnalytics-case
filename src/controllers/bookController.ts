import { Request, Response } from "express";
import { bookService } from "../services/bookService";
import { createBookBodyValidator } from "../validation/validators";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

const getBookInfo = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await bookService.getBookInfo(parseInt(bookId, 10));
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const { error } = createBookBodyValidator.validate(req.body);

    if (error) {
      res.status(400).json({
        error: "Book creation has been failed. The request has wrong format.",
      });
      return;
    }

    const bookName = req.body.name;
    const book = bookService.createBook(bookName);
    res.json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to create book" });
  }
};

export const bookController = { getAllBooks, getBookInfo, createBook };
