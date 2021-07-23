import { Timer, TimerProps } from "./types";
import * as uniqueId from "@am-i-focused/core/domain/unique-id"
import * as timerDuration from "./timer-duration"
import * as timerType from "./timer-type"
import { guard } from "./guard"
import { DomainError, isDomainError } from "@am-i-focused/core/domain/domain-error";
import { GuardError } from "@am-i-focused/core/utils/guard";

export function create (timerProps: TimerProps): Timer | DomainError | GuardError {
  const guardResult = guard(timerProps)
  if(!guardResult.valid){
    return guardResult.firstError
  }

  const idOrError = uniqueId.create({id: timerProps.id})

  if(isDomainError(idOrError)){
    return idOrError
  }

  const taskIdOrError = uniqueId.create({id: timerProps.taskId})

  if(isDomainError(taskIdOrError)){
    return taskIdOrError
  }

  const durationOrError = timerDuration.create({duration: timerProps.duration})

  if(isDomainError(durationOrError)){
    return durationOrError
  }

  const typeOrError = timerType.create({type: timerProps.type})

  if(isDomainError(typeOrError)){
    return typeOrError
  }

  return {
    ...timerProps,
    id: idOrError,
    duration: durationOrError,
    taskId: taskIdOrError,
    type: typeOrError
  }
};
