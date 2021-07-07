type TimerType = 'focus' | 'pause' | 'stop';

export class Timer {
  duration?: number;

  constructor(public type: TimerType, public startedAt: Date) {}

  end(date: Date) {
    const calculated = date.getTime() - this.startedAt.getTime();

    if(calculated < 0){
      // error
    }

    this.duration = calculated / 1000;
  }
}

export type TimerProps = {
  type: TimerType;
  startedAt: Date;
};

export const createTimer = ({ type, startedAt }: TimerProps) => {

  //TODO: validations


  return new Timer(type, startedAt)
};
