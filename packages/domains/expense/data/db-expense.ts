import Db from '@nc/utils/db/index.v2';
import { formatQuery } from '@nc/utils/db/query-formatter';
import { Expenses, GetExpensesRequest } from '../entity';

export async function readExpensesV2(request: GetExpensesRequest) {
  const repository = await Db.getEntityRepository(Expenses);
  const formattedQuery = formatQuery(request);
  formattedQuery.where.user_id = request.userId;
  return repository.find(formattedQuery);
}
