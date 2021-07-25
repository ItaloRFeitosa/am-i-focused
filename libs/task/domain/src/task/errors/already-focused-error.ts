import { DomainError } from '@am-i-focused/core/domain/domain-error';

export class AlreadyFocusedError extends DomainError {
  constructor() {
    super(
      'AlreadyFocusedError',
      'Task already focused'
    );
  }
}

export const alreadyFocused = () =>
  new AlreadyFocusedError();

export const isAlreadyFocusedError = (
  error: any
): error is AlreadyFocusedError =>
  error instanceof AlreadyFocusedError;
