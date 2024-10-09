import { AppDataSource } from "../../ormconfig";
import { Book } from "../entities/Book";
import { utils } from "../utils";

const getAllBooks = async () => {
  const bookRepository = AppDataSource.getRepository(Book);
  const books = await bookRepository.find();
  return books;
};

const getBookInfo = async (id: number) => {
  const bookRepository = AppDataSource.getRepository(Book);
  try {
    const book = await bookRepository.findOne({
      relations: {
        borrowings: {
          user: true,
        },
      },
      where: {
        id: id,
      },
    });

    //TODO: implement locking logic since Book viewing should be considered as a process much more frequent than borrowing and returning.

    if (book && book.borrowings) {
      const book_score = await utils.calculateAverageUserScore(book.borrowings);

      const bookObject = {
        name: book?.name,
        avarage_score: book_score,
      };
      return bookObject;
    }

    return book;
  } catch (err) {
    console.error("Error fetching book by ID:", err);
    throw err;
  }
};

const createBook = async (name: string) => {
  const bookRepository = AppDataSource.getRepository(Book);
  const newBook = bookRepository.create({ name });
  return await bookRepository.save(newBook);
};

export const bookService = { getAllBooks, getBookInfo, createBook };
