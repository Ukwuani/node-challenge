export function sortFormatter(word) {
  const sortSign = word[0];
  return `${(sortSign[0].match(/\w/)) ? word : word.slice(1)} ${(sortSign === '-') ? 'DESC' : 'ASC'}`;
}

export function addOrderBy(sort) {
  return sort ? `ORDER BY ${(JSON.parse(sort).map(sortFormatter)).toString()}` : '';
}

export function addLimit(limit?: number): string {
  return (limit) ? 'LIMIT $2' : '';
}

export function addOffset(page) {
  return (page) ? 'OFFSET (($3 - 1) * $2)' : '';
}
