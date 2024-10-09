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

export const utils = { calculateAverageUserScore };
