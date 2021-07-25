import {
  negativeTimerDuration,
  NegativeTimerDurationError,
} from './errors';
import { TimerDuration, TimerDurationProps } from './types';

// TODO: add better error logs
export const create = ({
  duration,
}: TimerDurationProps): TimerDuration | NegativeTimerDurationError => {
  if (duration === undefined) {
    return undefined;
  }

  if (duration < 0) {
    return negativeTimerDuration();
  }

  return duration as TimerDuration;
};
