import { v4 as uuid, validate } from 'uuid';
import { DomainError } from './domain-error';

export type UniqueId = string;

export type UniqueIdProps = { id?: string };

export const create = ({
  id,
}: UniqueIdProps): UniqueId | InvalidUniqueIdError => {
  if (!id) {
    return uuid() as UniqueId;
  }

  if (id && !isValid(id)) {
    return invalidUniqueIdError();
  }

  return id as UniqueId;
};

export class InvalidUniqueIdError extends DomainError {
  constructor() {
    super('InvalidUniqueIdError', 'Invalid unique id');
  }
}

export const invalidUniqueIdError = () => new InvalidUniqueIdError();

export const isInvalidUniqueIdError = (
  error: any
): error is InvalidUniqueIdError => error instanceof InvalidUniqueIdError;

export const isValid = (id: UniqueId) => validate(id);
