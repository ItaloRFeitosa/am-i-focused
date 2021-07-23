import { DomainError } from '@am-i-focused/core/domain/domain-error';

export class InvalidTaskStatusError extends DomainError {
  constructor() {
    super(
      'InvalidTaskStatusError',
      "Task status should be ready, focused, paused or stopped"
    );
  }
}

export const invalidTaskStatus = () =>
  new InvalidTaskStatusError();

export const isInvalidTaskStatusError = (
  error: any
): error is InvalidTaskStatusError =>
  error instanceof InvalidTaskStatusError;
