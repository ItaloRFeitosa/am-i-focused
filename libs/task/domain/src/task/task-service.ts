import { TaskStatus, Task } from './types';
import { createTimer, Timer } from './timer';


export function endLastTimerEvent(task: Task, endedAt: Date) {
  const lastTimerEvent = task.timers.slice().reverse()[0];
  lastTimerEvent.end(endedAt);
}

export function addTimerEvent(task: Task, timer: Timer) {
  endLastTimerEvent(task, timer.startedAt);
  task.timers.push(timer);
}

export function focus(task: Task, startedAt: Date) {
  if (!task.status.isFocused()) {
    const timerOrError = createTimer({ type: 'focus', startedAt });

    task.status.change('focused');

    addTimerEvent(task, timerOrError)
  }
}

export function pause(task: Task, startedAt: Date) {
  if (task.status.isFocused()) {
    const timerOrError = createTimer({ type: 'pause', startedAt });

    task.status.change('paused');

    addTimerEvent(task, timerOrError)
  }
}

export function stop(task: Task, startedAt: Date) {
  if (task.status.isFocused() && task.status.isPaused()) {
    const timerOrError = createTimer({ type: 'stop', startedAt });

    task.status.change('stopped');

    addTimerEvent(task, timerOrError)
  }
}

export function reset(task: Task) {
  if (task.status.isPaused()) {
    task.timers.pop();

    return task.timers.pop();
  }

  if (task.status.isFocused()) {
    return task.timers.pop();
  }
}
