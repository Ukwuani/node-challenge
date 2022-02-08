import { ApiError } from '@nc/utils/errors';
import { ExpenseModel } from '../model';
import { ExpenseSchema } from '../validator/schema';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { validator } from '@nc/utils/validator';

export const router = Router();

// expose the user expenses retreiver to '/expense/v1/get-user-expenses'
router.get('/get-user-expenses',
  validator(ExpenseSchema),
  async (req, res, next) => {
    const [expenseError, userExpenses] = await to(ExpenseModel.readAll({
      userId: `${req.query?.userId}`,
      query: req.query?.query,
      fields: req.query?.fields,
      limit: Number(req.query?.limit) || 0,
      page: Number(req.query?.page) || 0,
      sort: req.query?.sort,
      search: req.query?.search,
      searchFields: req.query?.searchFields,
    }));

    // throw some error is detected
    if (expenseError) {
      return next(new ApiError(
        expenseError,
        expenseError.status,
        `Could not get user's expenses: ${expenseError}`,
        expenseError.title,
        req
      ));
    }

    // respond with data
    return res.json(userExpenses || {});
  });
