import { UniqueId } from "@am-i-focused/core/domain/unique-id";
import { Timer, TimerProps } from "../timer/types";

export type TaskStatusProps = {
  status?: string;
};

export type TaskStatus = 'ready' | 'focused' | 'paused' | 'stopped';

export type TaskTimersProps = {
  timers?: TimerProps[]
}

export type TaskTimers = Timer[]

export type Task = {
  readonly id: UniqueId;
  readonly name: string;
  readonly userId: UniqueId;
  readonly status: TaskStatus;
  readonly timers: TaskTimers;
  readonly createdAt: Date;
};

export type TaskProps = {
  id?: string;
  name: string;
  userId: string;
  status?: string;
  timers?: TimerProps[];
  createdAt?: Date;
};
