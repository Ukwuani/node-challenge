import { readExpenses } from '../../data/db-expense';

jest.mock('@nc/utils/db', () => {
  const query = () => ({
    then: () => ({ status: 200 }),
    catch: () => ({ status: 500 }),
  });
  const connect = jest.fn();
  return { connect, query };
});

describe('[Packages | Expense-domain | DATA | DB-EXPENSE] readExpenses', () => {
  test('readExpenses should make a call to query database and should be successful', () => {
    expect(readExpenses('some-fake-user-id', 1, 1, '["currency"]')).toStrictEqual({ status: 200 });
  });
});
