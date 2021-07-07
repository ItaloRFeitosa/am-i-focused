import { DependencyContainer } from "tsyringe";
import { setupControllers } from "./controllers";

export const setupContainer = (container: DependencyContainer) => {
  setupControllers(container)
}
