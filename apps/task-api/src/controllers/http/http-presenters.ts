import { HttpResponse } from './ports';

export function created<T = any>(body: T): HttpResponse<T> {
  return {
    code: 201,
    body,
  };
}

export function ok<T = any>(body: T): HttpResponse<T> {
  return {
    code: 200,
    body,
  };
}
