import {
  negativeTimerDuration,
  NegativeTimerDurationError,
} from './errors';
import { TimerDuration, TimerDurationProps } from './types';

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
