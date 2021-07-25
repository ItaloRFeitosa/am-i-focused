import { TimerProps } from "../timer/types";
import * as timerDomain from "../timer/create-timer"
import { TaskTimers, TaskTimersProps } from "./types";
import { isError } from "@am-i-focused/core/utils/error";
import { invalidTaskTimers, InvalidTaskTimersError } from "./errors/invalid-task-timers-error";

// TODO: add better error logs
export function create(props: TaskTimersProps): TaskTimers | InvalidTaskTimersError {

  const timers: TaskTimers = []

  const errors: Error[] = []

  if (!props.timers || !props.timers.length) {
    return []
  }

  for (let timerProps of props.timers) {
    const timerOrError = timerDomain.create(timerProps)

    if(isError(timerOrError)){
      errors.push(timerOrError)
      break;
    }

    timers.push(timerOrError)
  }

  if(errors.length){
    return invalidTaskTimers(errors[0].message)
  }

  return timers
}
