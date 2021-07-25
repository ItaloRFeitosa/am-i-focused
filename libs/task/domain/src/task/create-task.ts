import { DomainError, isDomainError } from "@am-i-focused/core/domain/domain-error";
import { guard } from "./guard";
import { Task, TaskProps } from "./types";
import * as taskTimers from "./task-timers"
import * as taskStatus from "./task-status"
import * as uniqueId from "@am-i-focused/core/domain/unique-id"
import { isError } from "@am-i-focused/core/utils/error";
import { GuardError } from "@am-i-focused/core/utils/guard";


export function create (taskProps: TaskProps): Task | DomainError | GuardError {
  const guardResult = guard(taskProps)
  if(!guardResult.valid){
    return guardResult.firstError
  }

  const idOrError = uniqueId.create({id: taskProps.id})

  if(isDomainError(idOrError)){
    return idOrError
  }

  const userIdOrError = uniqueId.create({id: taskProps.userId})

  if(isDomainError(userIdOrError)){
    return userIdOrError
  }

  const taskTimersOrError = taskTimers.create({timers: taskProps.timers})

  if(isDomainError(taskTimersOrError)){
    return taskTimersOrError
  }

  const taskStatusOrError = taskStatus.create({status: taskProps.status})

  if(isDomainError(taskStatusOrError)){
    return taskStatusOrError
  }

  const createdAt = taskProps.createdAt || new Date()

  return {
    ...taskProps,
    id: idOrError,
    userId: userIdOrError,
    timers: taskTimersOrError,
    status: taskStatusOrError,
    createdAt,
  }
}
