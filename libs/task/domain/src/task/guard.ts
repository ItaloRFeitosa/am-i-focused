import { guardFactory, GuardRules } from "@am-i-focused/core/utils/guard"
import { TaskProps } from "./types";

const rules: GuardRules<TaskProps> = {
  name: ["required"],
  userId: ["required"],
}

export const guard = guardFactory<TaskProps>(rules)
