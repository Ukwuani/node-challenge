/**
 * schema for query on the get expense route
 * fields: are the selected fields to be fetched
 * searchFields: are the table fields that will be searched with the search keyword
 * search: the keyword for searching
 * query: a key value query
 *  */

export const ExpenseSchema = {
  userId: {
    type: 'uuid', optional: true,
  },

  fields: [
    { type: 'string', optional: true },
    { type: 'array', optional: true, items: 'string' },
  ],

  limit: {
    type: 'number', integer: true, min: 0, optional: true, convert: true,
  },

  page: {
    type: 'number', integer: true, min: 0, optional: true, convert: true,
  },

  sort: {
    type: 'string', optional: true,
  },

  search: {
    type: 'string', optional: true,
  },

  searchFields: [
    { type: 'string', optional: true },
    { type: 'array', optional: true, items: 'string' },
  ],

  query: [
    { type: 'object', optional: true },
    { type: 'string', optional: true },
  ],
};
