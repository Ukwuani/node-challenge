import { addLimitAndOffset, addOrderBy, sortFormatter } from '../../data/db.helper';

describe('[Packages | Expense-domain | DATA | DB HELPER] sortFormatter', () => {
  test('sortFormatter should format the sort field string, changing the signs into actual orders', () => {
    return expect(sortFormatter('-currency')).toEqual('currency DESC');
  });

  test('sortFormatter should add ASC to fields with no sign in front', () => {
    return expect(sortFormatter('currency')).toEqual('currency ASC');
  });

  test('sortFormatter should add ASC to fields with anyother sign in front', () => {
    return expect(sortFormatter('+currency')).toEqual('currency ASC');
  });
});

describe('[Packages | Expense-domain | DATA | DB HELPER] addLimitOffset', () => {
  test('addLimitOffset should add LIMIT & OFFSET to the query if data is passed in', () => {
    return expect(addLimitAndOffset(1, 2)).toEqual('LIMIT 1 OFFSET 1');
  });

  test('addLimitOffset should add LIMIT Without OFFSET to the query if data is passed in', () => {
    return expect(addLimitAndOffset(1, 0)).toEqual('LIMIT 1');
  });

  test('addLimitOffset should not add LIMIT & OFFSET to query if limit is null', () => {
    return expect(addLimitAndOffset()).toEqual('');
  });
});

describe('[Packages | Expense-domain | DATA | DB HELPER] addOrderBy', () => {
  test('addOrderBy should add ORDER BY to the query if present', () => {
    return expect(addOrderBy('["-currency", "amount"]')).toEqual('ORDER BY currency DESC,amount ASC');
  });
});
