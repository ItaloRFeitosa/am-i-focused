import { DomainError, isDomainError } from "@am-i-focused/core/domain/domain-error";
import { guard } from "./guard";
import { Task, TaskProps } from "./types";
import * as Timer from "../timer/create-timer"
import * as uniqueId from "@am-i-focused/core/domain/unique-id"
import { isError } from "@am-i-focused/core/utils/error";


export function create (taskProps: TaskProps): Task | DomainError {
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

  const createdAt = taskProps.createdAt || new Date()

  return {
    ...taskProps,
    id: idOrError,
    userId: userIdOrError,
    createdAt
  }
}
