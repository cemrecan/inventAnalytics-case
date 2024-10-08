import { AppDataSource } from "../../ormconfig";
import { Book } from "../entities/Book";

const getAllBooks = async () => {
  const bookRepository = AppDataSource.getRepository(Book);
  const books = await bookRepository.find();
  return books;
};

const getBookInfo = async (id: number) => {
  const bookRepository = AppDataSource.getRepository(Book);
  try {
    const book = await bookRepository.findOneBy({ id });
    // TODO: details will add such as avarage rating
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
