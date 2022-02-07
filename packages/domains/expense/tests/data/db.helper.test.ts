import { addLimit, addOffset, addOrderBy, sortFormatter } from '../../data/db.helper';

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

describe('[Packages | Expense-domain | DATA | DB HELPER] addLimit', () => {
  test('addLimit should add LIMIT to the query if data is passed in', () => {
    return expect(addLimit(1)).toEqual('LIMIT $2');
  });

  test('addLimit should not add LIMIT to query if limit is null', () => {
    return expect(addLimit()).toEqual('');
  });
});

describe('[Packages | Expense-domain | DATA | DB HELPER] addOffset', () => {
  test('addOffset should add OFFSET to query if present', () => {
    return expect(addOffset(1)).toEqual('OFFSET (($3 - 1) * $2)');
  });
});

describe('[Packages | Expense-domain | DATA | DB HELPER] addOrderBy', () => {
  test('addOrderBy should add ORDER BY to the query if present', () => {
    return expect(addOrderBy('["-currency", "amount"]')).toEqual('ORDER BY currency DESC,amount ASC');
  });
});
