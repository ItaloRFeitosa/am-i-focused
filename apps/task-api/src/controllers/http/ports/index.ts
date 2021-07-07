
export interface HttpController<T = any, R = any> {
  handle(params?: HttpRequest<T>): Promise<HttpResponse<R>>;
}

export type HttpRequest<T> = {
  body: T
}

export type HttpResponse<T> = {
  body: T,
  code: number,
}
