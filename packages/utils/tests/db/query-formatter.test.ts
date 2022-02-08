import { addOrderBy, addSearchQuery, formatQuery, safeParse } from '../../db/query-formatter';

describe('[Packages | Core-util | DB | Query Formatter] safeParse', () => {
  test('safeParse should add parse stringified objects', () => {
    return expect(safeParse(JSON.stringify(['currency']))).toEqual(['currency']);
  });

  test('safeParse should ignore already parsed objects', () => {
    return expect(safeParse(['currency'])).toEqual(['currency']);
  });

  test('safeParse should ignore normal text strings', () => {
    return expect(safeParse('currency')).toEqual('currency');
  });
});

describe('[Packages | Core-util | DB | Query Formatter] addOrderBy', () => {
  test('addOrderBy should add ASC to fields with no sign in front', () => {
    return expect(addOrderBy(['currency'])).toEqual({ currency: 'ASC' });
  });

  test('addOrderBy should add DESC to fields with negative sign in front', () => {
    return expect(addOrderBy(['-currency'])).toEqual({ currency: 'DESC' });
  });

  test('addOrderBy should add ASC to fields with anyother sign in front', () => {
    return expect(addOrderBy(['^currency'])).toEqual({ currency: 'ASC' });
  });

  test('addOrderBy should format the sort field query, changing the signs into actual orders', () => {
    return expect(addOrderBy(['-currency', 'amount'])).toEqual({ amount: 'ASC', currency: 'DESC' });
  });
});

describe('[Packages | Core-util | DB | Query Formatter] addSearchQuery', () => {
  test('addSearchQuery should convert search and searchfields to query', () => {
    return expect(addSearchQuery('searchtext', ['field', 'anotherfield'])).toEqual({
      anotherfield: {
        _getSql: undefined,
        _multipleParameters: false,
        _objectLiteralParameters: undefined,
        _type: 'ilike',
        _useParameter: true,
        _value: '%searchtext%',
      }, field: {
        _getSql: undefined,
        _multipleParameters: false,
        _objectLiteralParameters: undefined,
        _type: 'ilike',
        _useParameter: true,
        _value: '%searchtext%' } });
  });

  test('addSearchQuery should ignore formatting when either of searchtext or searchfield is empty', () => {
    expect(addSearchQuery('searchtext', null)).toEqual({});
    expect(addSearchQuery(null, ['field', 'anotherfield'])).toEqual({});
  });
});

describe('[Packages | Core-util | DB | Query Formatter] formatQuery', () => {
  test('formatQuery should format input query to typeorm format', () => {
    return expect(formatQuery({
      query: {
        merchant_name: 'Slider',
      },
      fields: 'merchant_name',
      limit: 1,
      page: 1,
      sort: ['-currency'],
      search: 'dkk',
      searchFields: ['currency'],
    })).toEqual({
      currency: {
        _getSql: undefined,
        _multipleParameters: false,
        _objectLiteralParameters: undefined,
        _type: 'ilike',
        _useParameter: true,
        _value: '%dkk%',
      },
      order: { currency: 'DESC' },
      select: 'merchant_name',
      skip: 0,
      take: 1,
      where: { merchant_name: 'Slider' },
    });
  });
});
