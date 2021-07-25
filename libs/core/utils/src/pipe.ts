import { isError } from "./error"

export const _ = undefined

export type Pipeable<T> = (value:T, ...args:any) => T | Error

export type Piped<T> = (...args: any) => (value: T ) => T | Error

export function pipefy<T = any>(fn: Pipeable<T>): Piped<T> {
  return (...args: any) => (value: T) => fn(value, ...args)
}

export function pipe<T = any>(...fns: ((value: T | Error) => T | Error)[]){
  return (value: T) =>
    fns.reduce((lastResult, fn) => {
      if(isError(lastResult)){
        return lastResult
      }

      return fn(lastResult)
    }, value)
}
