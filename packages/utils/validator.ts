import { BadRequest } from './errors';
import Validator, { ValidationError } from 'fastest-validator';

export function validator(schema) {
  const validate = new Validator();
  const check = validate.compile(schema);

  return (req, _res, next) => {
    const value = check(req.query);
    if (value !== true) {
      return next(BadRequest(`The entered format for query fields [${(value as ValidationError[]).map((k) => k.field)}] is/are incorrect `, req));
    }
    next();
  };
}
