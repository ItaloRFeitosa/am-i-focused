import { invalidTaskStatus, InvalidTaskStatusError } from "./errors";
import { TaskStatus, TaskStatusProps } from "./types";

function is(status: string){
  return (taskStatus: TaskStatus) => String(taskStatus) === status
}

const isReady = is('ready')

const isFocused = is('focused')

const isPaused = is('paused')

const isStopped = is('stopped')

function create ({ status }: TaskStatusProps): TaskStatus | InvalidTaskStatusError {
  if(status === undefined){
    return "ready"
  }

  const validStatuses: TaskStatus[] = ["ready", "focused", "paused", "stopped"];

  if (!validStatuses.includes(status as TaskStatus)) {
    return invalidTaskStatus();
  }

  return status as TaskStatus;
};

export default {
  isReady,
  isFocused,
  isPaused,
  isStopped,
  create,
}
