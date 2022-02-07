export function sortFormatter(word) {
  const sortSign = word[0];
  return `${(sortSign[0].match(/\w/)) ? word : word.slice(1)} ${(sortSign === '-') ? 'DESC' : 'ASC'}`;
}

export function addOrderBy(sort) {
  return sort ? `ORDER BY ${(JSON.parse(sort).map(sortFormatter)).toString()}` : '';
}

export function addLimitAndOffset(limit?: number, page?: number): string {
  let query = '';
  query += (limit) ? `LIMIT ${limit}` : '';
  query += (page) ? ` OFFSET ${(page - 1) * limit}` : '';
  return query;
}
