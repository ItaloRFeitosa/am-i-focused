import { DependencyContainer } from "tsyringe";
import { HttpController } from "../controllers/http/ports";
import { CreateTaskController } from "../controllers/http/tasks/create-task-controller";

export const setupControllers = (container: DependencyContainer) => {
  container.register<HttpController>("CreateTaskController", {useClass: CreateTaskController})
  container.register<HttpController>("FocusTaskController", {useClass: CreateTaskController})
  container.register<HttpController>("PauseTaskController", {useClass: CreateTaskController})
  container.register<HttpController>("GetTaskController", {useClass: CreateTaskController})
}
