import { query as Query } from '@nc/utils/db';
import { UUID } from '@nc/utils/types';
import { addLimit, addOffset, addOrderBy } from './db.helper';

export function readExpenses(userId: UUID, limit: number, page: number = 1, sort) {
  return Query(`
  SELECT * 
  FROM expenses 
  WHERE user_id = $1 
  ${addOrderBy(sort)}
  ${addLimit(limit)} 
  ${addOffset(page)}`,
  [userId, limit, page]).then((response) => response.rows);
}
