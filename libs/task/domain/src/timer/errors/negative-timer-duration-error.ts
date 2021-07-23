import { DomainError } from '@am-i-focused/core/domain/domain-error';

export class NegativeTimerDurationError extends DomainError {
  constructor() {
    super(
      'NegativeTimerDurationError',
      "Timer duration shouldn't be negative"
    );
  }
}

export const negativeTimerDuration = () =>
  new NegativeTimerDurationError();

export const isNegativeTimerDurationError = (
  error: any
): error is NegativeTimerDurationError =>
  error instanceof NegativeTimerDurationError;
