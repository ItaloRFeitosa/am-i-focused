import { DomainError } from '@am-i-focused/core/domain/domain-error';

export class InvalidTaskTimersError extends DomainError {
  constructor(message) {
    super(
      'InvalidTaskTimersError',
      message
    );
  }
}

export const invalidTaskTimers = (message) =>
  new InvalidTaskTimersError(message);

export const isInvalidTaskTimersError = (
  error: any
): error is InvalidTaskTimersError =>
  error instanceof InvalidTaskTimersError;
