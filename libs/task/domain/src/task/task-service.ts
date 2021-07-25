import { TaskStatus, Task } from './types';
import { create as createTimer } from '../timer/create-timer';
import { end as endTimer } from '../timer/end-timer';
import { Timer } from '../timer/types';
import { isFocused, isReady, isStopped } from './task-status';
import { DomainError, isDomainError } from '@am-i-focused/core/domain/domain-error';
import { isError } from '@am-i-focused/core/utils/error';
import { GuardError } from '@am-i-focused/core/utils/guard';
import { alreadyFocused } from './errors/already-focused-error';
import { create as createTaskStatus } from './task-status'
import { pipe, pipefy } from '@am-i-focused/core/utils/pipe'

export function endLastTimer(task: Task, endedAt: Date): Task | DomainError {
  const timersWithoutlast = task.timers.slice(0, -1)
  const [lastTimer] = task.timers.slice(-1)
  const lastTimerEndedOrError = endTimer(lastTimer, endedAt);

  if (isDomainError(lastTimerEndedOrError)) {
    return lastTimerEndedOrError
  }

  return {
    ...task,
    timers: [...timersWithoutlast, lastTimerEndedOrError]
  }
}

export function changeStatus(task: Task, status: string): Task | DomainError {
  const taskStatusOrError = createTaskStatus({ status })
  if (isDomainError(taskStatusOrError)) {
    return taskStatusOrError
  }
  return { ...task, status: taskStatusOrError }
}

export const appendTimerFactory = (timerType: string) => (task: Task, startedAt: Date): Task | DomainError | GuardError => {
  const taskOrError = endLastTimer(task, startedAt);

  if (isDomainError(taskOrError)) {
    return taskOrError
  }

  const timerOrError = createTimer({ type: timerType, taskId: task.id, startedAt });

    if (isError(timerOrError)) {
      return timerOrError
    }

  return {
    ...taskOrError,
    timers: [...taskOrError.timers, timerOrError]
  }
}

export const addTimer = (timerType: string, startedAt: Date) => {
  const taskStatusMapper = {
    focus: 'focused',
    pause: 'paused',
    stop: 'stopped',
  }

  const taskStatus = taskStatusMapper[timerType]

  const appendTimer = appendTimerFactory(timerType)

  const append = pipefy(appendTimer)

  const change = pipefy(changeStatus)

  return pipe(append(startedAt), change(taskStatus))
}

const validFocus = (task: Task) => {
  if (!isFocused(task.status)) {
    return alreadyFocused()
  }

  return task
}

const validPause = (task: Task) => {
  if (isFocused(task.status)) {
    return alreadyFocused()
  }

  return task
}

const validStop= (task: Task) => {
  if (isReady(task.status) || isStopped(task.status)) {
    return alreadyFocused()
  }


  return task
}


export const focus = (task: Task, startedAt: Date): Task | DomainError | GuardError  => pipe(validFocus, addTimer('focus', startedAt))(task)

export const pause = (task: Task, startedAt: Date): Task | DomainError | GuardError  => pipe(validPause, addTimer('pause', startedAt))(task)

export const stop = (task: Task, startedAt: Date): Task | DomainError | GuardError  => pipe(validStop, addTimer('stop', startedAt))(task)


// export function reset(task: Task) {
//   if (task.status.isPaused()) {
//     task.timers.pop();

//     return task.timers.pop();
//   }

//   if (task.status.isFocused()) {
//     return task.timers.pop();
//   }
// }
