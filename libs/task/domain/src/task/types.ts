import { UniqueId } from "@am-i-focused/core/domain/unique-id";
import { Timer, TimerProps } from "../timer/types";

export type TaskStatusProps = {
  status?: string;
};

export type TaskStatus = 'ready' | 'focused' | 'paused' | 'stopped';

export type Task = {
  readonly id: UniqueId;
  readonly name: string;
  readonly userId: UniqueId;
  readonly status: TaskStatus;
  readonly timers: Timer[];
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
