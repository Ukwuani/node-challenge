import Db from '@nc/utils/db';

export function readUser(userId) {
  return Db.query('SELECT * FROM users WHERE id = $1', [userId])
    .then((response) => response.rows?.[0]);
}
