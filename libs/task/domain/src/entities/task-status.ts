type Status = 'ready' | 'focused' | 'paused' | 'stopped';

export type TaskStatusProps = {
  value: Status;
};
export class TaskStatus {
  constructor(private _value: Status) {}

  get value() {
    return String(this._value);
  }
  public change(status: Status) {
    this._value = status;
  }

  public isReady() {
    return this._value === 'ready';
  }

  public isFocused() {
    return this._value === 'focused';
  }

  public isPaused() {
    return this._value === 'paused';
  }

  public isStopped() {
    return this._value === 'stopped';
  }
}

export const createTaskStatus = ({ value }: TaskStatusProps) => {
  //TODO: add validations

  return new TaskStatus(value);
};
