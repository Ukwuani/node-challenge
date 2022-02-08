import Db from '@nc/utils/db';
import { addLimitAndOffset, addOrderBy } from './db.helper';
import { Expenses, GetExpensesRequest } from '../entity';

export async function readExpensesV2(request: GetExpensesRequest) {
  const repository = await Db.getEntityRepository(Expenses);
  return repository.find({
    where: { user_id: request.userId },
  });
}

export function readExpensesV1({
  userId, limit, page, sort, search, searchFields,
}) {
  return Db.query(`
  SELECT * 
  FROM expenses 
  WHERE user_id = $1 ${(search && searchFields) ? ' OR ' + JSON.parse(searchFields).map(
    (f) => f + ' iLIKE %' + search + '%'
  ).toString().replace(/,/g, ' OR ') : ''}
  ${addOrderBy(sort)}
  ${addLimitAndOffset(limit, page)}`,
  [userId]).then((response) => response.rows);
}
