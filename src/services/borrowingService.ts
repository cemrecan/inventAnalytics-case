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

export const borrowingService = { borrowBook };
