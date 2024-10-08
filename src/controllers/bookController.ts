import { Request, Response, request } from "express";
import { bookService } from "../services/bookService";

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
    const bookName = req.body.name;
    const book = bookService.createBook(bookName);
    res.json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Failed to cerate book" });
  }
};

export const bookController = { getAllBooks, getBookInfo, createBook };
