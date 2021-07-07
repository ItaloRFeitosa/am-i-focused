export class TimerDuration {

  constructor(public value: number){}
}

export type TimerDurationProps = {
  duration: number
}
export const createTimerDuration = ({duration}: TimerDurationProps) => {
  if(duration < 0){
    // error
  }

  return new TimerDuration(duration)
}
