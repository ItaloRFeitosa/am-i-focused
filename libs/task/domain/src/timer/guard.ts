import { guardFactory, GuardRules } from "@am-i-focused/core/utils/guard"
import { TimerProps } from "./types";

const rules: GuardRules<TimerProps> = {
  type: ["required"],
  startedAt: ["required"],
  taskId: ["required"],
}

export const guard = guardFactory<TimerProps>(rules)
