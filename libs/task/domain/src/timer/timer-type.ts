import { invalidTimerType, InvalidTimerTypeError } from './errors';
import { TimerType, TimerTypeProps } from './types';

export const create = ({
  type,
}: TimerTypeProps): TimerType | InvalidTimerTypeError => {
  const validTypes: TimerType[] = ['focus', 'stop', 'pause'];

  if (!validTypes.includes(type as TimerType)) {
    return invalidTimerType();
  }

  return type as TimerType;
};
