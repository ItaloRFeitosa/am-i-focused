import { DependencyContainer } from "tsyringe";
import { makeRoutes } from "./routes";
import * as express from "express"

export const makeApp = (container: DependencyContainer) => {
  const app = express()
  const router = makeRoutes(container)
  app.use('/', router)

  return app
}
