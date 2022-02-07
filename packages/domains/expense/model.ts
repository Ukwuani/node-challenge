import { Expense } from './types';
import { readExpenses } from './data/db-expense';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

// this calls the 'readExpenses' function to get particular user's expenses
export async function getUserExpenses(userId: string, limit: number, page: number, sort): Promise<Expense> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  // retreive response
  const [dbError, rawData] = await to(readExpenses(userId, limit, page, sort));

  // throw some error once detected
  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rawData) {
    throw NotFound(`Could not find expenses for user with id ${userId}`);
  }

  return rawData;
}
