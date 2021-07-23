import { DomainError } from '@am-i-focused/core/domain/domain-error';

export class InvalidTimerTypeError extends DomainError {
  constructor() {
    super('InvalidTimerTypeError', 'Timer type should be focus, pause or stop');
  }
}

export const invalidTimerType = () => new InvalidTimerTypeError();

export const isInvalidTimerTypeError = (
  error: any
): error is InvalidTimerTypeError => error instanceof InvalidTimerTypeError;
