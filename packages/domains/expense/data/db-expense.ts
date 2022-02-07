import { query as Query } from '@nc/utils/db';
import { UUID } from '@nc/utils/types';
import { addLimitAndOffset, addOrderBy } from './db.helper';

export function readExpenses(userId: UUID, limit: number, page: number = 1, sort) {
  return Query(`
  SELECT * 
  FROM expenses 
  WHERE user_id = $1 
  ${addOrderBy(sort)}
  ${addLimitAndOffset(limit, page)}`,
  [userId]).then((response) => response.rows);
}
