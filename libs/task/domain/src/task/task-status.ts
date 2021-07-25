import { invalidTaskStatus, InvalidTaskStatusError } from "./errors";
import { TaskStatus, TaskStatusProps } from "./types";

function is(status: string){
  return (taskStatus: TaskStatus) => String(taskStatus) === status
}

export const isReady = is('ready')

export const isFocused = is('focused')

export const isPaused = is('paused')

export const isStopped = is('stopped')

// TODO: add better error logs
export function create ({ status }: TaskStatusProps): TaskStatus | InvalidTaskStatusError {
  if(status === undefined){
    return "ready"
  }

  const validStatuses: TaskStatus[] = ["ready", "focused", "paused", "stopped"];

  if (!validStatuses.includes(status as TaskStatus)) {
    return invalidTaskStatus();
  }

  return status as TaskStatus;
};

