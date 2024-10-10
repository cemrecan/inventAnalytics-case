import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../ormconfig";
import { Borrowing } from "./entities/Borrowing";

const calculateAverageUserScore = async (borrowings: any[]) => {
  let sum = 0;
  let count = 0;

  for (const borrowing of borrowings) {
    if (borrowing.user_score !== null) {
      sum += borrowing.user_score;
      count++;
    }
  }

  if (count === 0) {
    return 0;
  }

  return sum / count;
};

const findUserPastBorrowings = async (userId: number) => {
  const borrowingRepository = AppDataSource.getRepository(Borrowing);

  const pastBorrowings = await borrowingRepository.find({
    relations: { user: true, book: true },
    where: {
      user: {
        id: userId,
      },
      returned_date: Not(IsNull()),
    },
  });

  const pastBorrowingsObject = [];

  for (const borrowing of pastBorrowings) {
    pastBorrowingsObject.push({
      book_name: borrowing.book.name,
      borrowed_date: borrowing.borrowed_date,
      returned_date: borrowing.returned_date,
      user_score: borrowing.user_score,
    });
  }

  return pastBorrowingsObject;
};

const findUserCurrentBorrowings = async (userId: number) => {
  const borrowingRepository = AppDataSource.getRepository(Borrowing);

  const currentBorrowings = await borrowingRepository.find({
    relations: { user: true, book: true },
    where: {
      user: {
        id: userId,
      },
      returned_date: IsNull(),
    },
  });

  const currentBorrowingsObject = [];

  for (const borrowing of currentBorrowings) {
    currentBorrowingsObject.push({
      book_name: borrowing.book.name,
      borrowed_date: borrowing.borrowed_date,
    });
  }

  return currentBorrowingsObject;
};

export const utils = {
  calculateAverageUserScore,
  findUserPastBorrowings,
  findUserCurrentBorrowings,
};
