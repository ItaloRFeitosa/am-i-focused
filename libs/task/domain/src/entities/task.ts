import { TaskStatus, createTaskStatus } from './task-status';
import { createTimer, Timer } from './timer';

class Task {
  id: string;
  name: string;
  userId: string;
  status: TaskStatus;
  timers: Timer[];

  endLastTimerEvent(endedAt: Date) {
    const lastTimerEvent = this.timers.slice().reverse()[0];
    lastTimerEvent.end(endedAt);
  }

  addTimerEvent(timer: Timer) {
    this.endLastTimerEvent(timer.startedAt);
    this.timers.push(timer);
}

  focus(startedAt: Date) {
    if (!this.status.isFocused()) {
      const timerOrError = createTimer({ type: 'focus', startedAt });

      this.status.change('focused');

      this.addTimerEvent(timerOrError)
    }
  }

  pause(startedAt: Date) {
    if (this.status.isFocused()) {
      const timerOrError = createTimer({ type: 'pause', startedAt });

      this.status.change('paused');

      this.addTimerEvent(timerOrError)
    }
  }

  stop(startedAt: Date) {
    if (this.status.isFocused() && this.status.isPaused()) {
      const timerOrError = createTimer({ type: 'stop', startedAt });

      this.status.change('stopped');

      this.addTimerEvent(timerOrError)
    }
  }

  reset() {
    if (this.status.isPaused()) {
      this.timers.pop();

      return this.timers.pop();
    }

    if (this.status.isFocused()) {
      return this.timers.pop();
    }
  }
}
