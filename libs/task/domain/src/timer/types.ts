import { UniqueId } from "@am-i-focused/core/domain/unique-id";

export type TimerType = 'focus' | 'pause' | 'stop';

export type TimerDuration = number

export type Timer = {
  readonly id: UniqueId,
  readonly taskId: UniqueId,
  readonly type: TimerType;
  readonly startedAt: Date;
  readonly duration?: TimerDuration
};

export type TimerProps = {
  id?: string,
  type: string,
  taskId: string,
  startedAt: Date,
  duration?: number
}

export type TimerTypeProps = {
  type: string;
};

export type TimerDurationProps = {
  duration?: number;
};
