import { GetRequest } from '../types';
import { ILike } from 'typeorm';

/**
 *
 * @param data data to be parsed
 * @returns parsed data
 */
export function safeParse(data) {
  let safeData = data;
  if (typeof data === 'string' && (/[^\w]/.test(safeData[0]))) {
    safeData = JSON.parse(data);
  }
  return safeData;
}

/**
 * @param sort contains the sort order string [field, -field]
 * @returns object {field: 'DESC'}
 */
export function addOrderBy(sort) {
  let sortData = sort;
  const orderBy = {};
  // if sort is a string, convert into an array
  if (typeof sortData === 'string') {
    sortData = safeParse(sortData).toString().replace(/,/g, ' ').split(' ');
  }

  // if sort is an Array, run formatter on the converted data too
  if (Array.isArray(sortData)) {
    sortData.forEach((el) => {
      orderBy[`${(el[0].match(/\w/)) ? el : el.slice(1)}`] = (el[0] === '-') ? 'DESC' : 'ASC';
    });
  }
  return orderBy;
}

/**
 *
 * @param search the test to be searched
 * @param searchFields the fields to search the text in
 * @returns object {field: ILike('%')}
 */
export function addSearchQuery(search: string, searchFields: string[]) {
  const query = {};
  // if search and searchFields does not exist, return an empty object
  if (!search || !searchFields) {
    return query;
  }
  const searchData = safeParse(search);
  const searchFieldsData = safeParse(searchFields).toString().replace(/,/g, ' ').split(' ');
  //
  if (Array.isArray(searchFieldsData)) {
    searchFieldsData.forEach((el) => {
      query[el] = ILike('%' + searchData + '%');
    });
  }
  return query;
}

/**
 *
 * @param query the query input to be formated to the typeorm style
 * @returns object {...}
 */
export function formatQuery(query: GetRequest) {
  const queryBuilder = {};
  queryBuilder.select = safeParse(query.fields);
  queryBuilder.where = safeParse(query.query) || {};
  queryBuilder.take = query.limit;
  queryBuilder.skip = ((query.page || 1) - 1) * query.limit || 0;
  queryBuilder.order = addOrderBy(query.sort);

  // get the search query
  const searchQuery = addSearchQuery(query.search, query.searchFields);
  // add the search query to the querybuilder
  Object.assign(queryBuilder, searchQuery);
  return queryBuilder;
}
