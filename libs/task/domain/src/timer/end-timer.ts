import { Timer } from "./types";
import { NegativeTimerDurationError, isNegativeTimerDurationError} from './errors'
import * as timerDuration from './timer-duration'

// TODO: add better error logs
export function end(timer: Timer, date: Date): Timer | NegativeTimerDurationError {
  const calculated = date.getTime() - timer.startedAt.getTime();

  const durationOrError = timerDuration.create({duration: calculated})

  if(isNegativeTimerDurationError(durationOrError)){
    return durationOrError
  }

  return {
    ...timer,
    duration: durationOrError
  }
}
