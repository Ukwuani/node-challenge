import { readExpensesV2 } from './data/db-expense';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { Expense, GetExpensesRequest } from './entity';

export class ExpenseModel {
  static async readAll(request: GetExpensesRequest): Promise<Expense> {
    if (!request.userId) {
      throw BadRequest('userId property is missing.');
    }

    // retreive response
    const [dbError, rawData] = await to(readExpensesV2(request));

    // throw some error once detected
    if (dbError) {
      throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
    }

    if (!rawData) {
      throw NotFound(`Could not find expenses for user with id ${request.userId}`);
    }

    return rawData;
  }
}
