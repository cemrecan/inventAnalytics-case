import { IsNull } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Book } from "../entities/Book";
import { Borrowing } from "../entities/Borrowing";
import { User } from "../entities/User";

const borrowBook = async (userId: number, bookId: number) => {
  const borrowingRepository = AppDataSource.getRepository(Borrowing);
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);

  try {
    const user = await userRepository.findOneBy({ id: userId });
    const book = await bookRepository.findOneBy({ id: bookId });

    if (!user || !book) {
      throw new Error(
        "User or book not found. Cannot create borrowing record."
      );
    }

    const newBorrowing = borrowingRepository.create({
      user,
      book,
      borrowed_date: new Date(),
    });

    return borrowingRepository.save(newBorrowing);
  } catch (err) {
    console.error("Error creating borrowing:", err);
    throw err;
  }
};

const returnBook = async (userId: number, bookId: number, score: number) => {
  const borrowingRepository = AppDataSource.getRepository(Borrowing);
  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);
  let errMessage = "";

  try {
    const user = await userRepository.findOneBy({ id: userId });
    const book = await bookRepository.findOneBy({ id: bookId });

    if (!user || !book) {
      errMessage = "User or book not found. Cannot create borrowing record.";
      console.error(errMessage);
      return errMessage;
    }
    const returnBorrrowing = await borrowingRepository.findOne({
      relations: {
        user: true,
        book: true,
      },
      where: {
        user: {
          id: userId,
        },
        book: {
          id: bookId,
        },
        returned_date: IsNull(),
      },
    });

    if (!returnBorrrowing) {
      errMessage =
        "Borrowing information not found. Cannot return book before borrow.";
      console.error(errMessage);
      return errMessage;
    }
    // else if (returnBorrrowing.returned_date !== null) {
    //   errMessage =
    //     "Book has already returned at date " + returnBorrrowing.returned_date;
    //   console.error(errMessage);
    //   return errMessage;
    // }

    returnBorrrowing.returned_date = new Date();
    returnBorrrowing.user_score = score;

    return borrowingRepository.save(returnBorrrowing);
  } catch (err) {
    console.error("Error returning borrowing:", err);
    throw err;
  }
};

export const borrowingService = { borrowBook, returnBook };
