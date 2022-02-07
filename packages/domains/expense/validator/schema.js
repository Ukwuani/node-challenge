export const getExpenseSchema = {
  userId: { type: 'uuid' },
  fields: [
    { type: 'string', optional: true },
    { type: 'array', optional: true, items: 'string' },
  ],
  limit: { type: 'number', integer: true, min: 0, optional: true, convert: true },
  page: { type: 'number', integer: true, min: 0, optional: true, convert: true },
  sort: { type: 'string', optional: true },
  search: { type: 'string', optional: true },
  searchFields: [
    { type: 'string', optional: true },
    { type: 'array', optional: true, items: 'string' },
  ],
  query: [
    { type: 'object', optional: true },
    { type: 'string', optional: true },
  ],
};
