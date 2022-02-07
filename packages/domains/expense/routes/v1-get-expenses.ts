import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { getExpenseSchema } from '../validator/schema';
import { validator } from '@nc/utils/validator';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

// expose the user expenses retreiver to '/expense/v1/get-user-expenses'
router.get('/get-user-expenses',
  validator(getExpenseSchema),
  async (req, res, next) => {
    const [expenseError, userExpenses] = await to(getUserExpenses(
      `${req.query?.userId}`,
      Number(req.query?.limit) || 0,
      Number(req.query?.page) || 0,
      req.query?.sort
    ));

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

    // if no data was found for the query, return empty object
    if (!userExpenses) {
      return res.json({});
    }

    // respond with data
    return res.json(userExpenses);
  });
