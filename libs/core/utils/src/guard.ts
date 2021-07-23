export const validators = {
  required: (value: any) => !!value,
};

export type Validators = typeof validators;

export type GuardRule = keyof Validators;

export type GuardRules<T> = {
  [key in keyof T]?: GuardRule[];
};

export class GuardError extends Error {
  constructor(prop, message) {
    super(`${prop}: ${message}`);
    this.name = 'GuardError:' + prop;
  }
}

export type GuardErrors<T> = {
  [key in keyof T]?: GuardError[];
};

export type GuardResult<T> = {
  valid: boolean;
  errors: GuardErrors<T>;
  firstError: GuardError
};

const validate = (prop: string, value: any, rule: GuardRule[]) =>
  rule.reduce<GuardError[]>((acc, validatorKey) => {
    const validator = validators[validatorKey];
    if (!validator(value)) {
      return [...acc, new GuardError(prop, validatorKey)];
    }
    return acc;
  }, [] as GuardError[]);


export function guardFactory<T>(rules: GuardRules<T>) {
  return (obj: T): GuardResult<T> => {
    const errors = {} as GuardErrors<T>;
    let valid = true;
    for (const key in rules) {
      const rule = rules[key];
      const value = obj[key]

      const isValidRule = !Array.isArray(rule) || !rule.length;

      if (isValidRule) {
        console.error(`rule to ${key} not valid`)
        continue;
      }

      const ruleErrors = validate(key, value , rule)

      if (ruleErrors.length) {
        valid = false;
      }

      errors[key] = ruleErrors;
    }

    return {
      valid,
      errors,
      firstError: Object.values(errors)[0][0]
    };
  };
}
