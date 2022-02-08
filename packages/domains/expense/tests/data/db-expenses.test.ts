import Db from '@nc/utils/db/index.v2';
import { readExpensesV2 } from '../../data/db-expense';

jest.mock('@nc/utils/db/index.v2');

describe('[Packages | Expense-domain | DATA | DB-EXPENSE] readExpensesV2', () => {
  test('readExpensesV2 should make a call to query database and should be successful', async () => {
    Db.getEntityRepository = jest.fn().mockReturnValue({
      find: (f) => ({
        status: 200,
        userId: f.where.user_id,
      }),
    });
    const response = await readExpensesV2({
      userId: 'some-fake-user',
    });
    expect(response).toEqual({ status: 200, userId: 'some-fake-user' });
  });
});
