import { GuardError, guardFactory, GuardRules } from '../src/guard'

type TestObject = {
  aRequiredProp: any,
  aNotRequiredProp: any
}

describe("guard tests", () => {
  it("should validate a valid object", () => {
    const rules: GuardRules<Partial<TestObject>> = {
      aRequiredProp: ["required"]
    }

    const testObject: TestObject = {
      aRequiredProp: "some value",
      aNotRequiredProp: "",
    }
    const guard = guardFactory<TestObject>(rules)

    const {valid, errors} = guard(testObject)

    expect(valid).toBeTruthy()

    expect(errors.aRequiredProp).toBeDefined()
    expect(errors.aRequiredProp.length).toBe(0)
    expect(errors.aNotRequiredProp).toBeUndefined()
  })

  it("should validate a invalid object", () => {
    const rules: GuardRules<TestObject> = {
      aRequiredProp: ["required"]
    }

    const testObject: TestObject = {
      aRequiredProp: "",
      aNotRequiredProp: "",
    }
    const guard = guardFactory<TestObject>(rules)

    const {valid, errors} = guard(testObject)

    expect(valid).toBeFalsy()

    expect(errors.aRequiredProp).toBeDefined()
    expect(errors.aRequiredProp.length).toBe(1)
    const { 0: requiredGuardError } = errors.aRequiredProp
    expect(requiredGuardError).toBeInstanceOf(GuardError)
    expect(requiredGuardError.message).toMatch("aRequiredProp: required")
    expect(requiredGuardError.name).toMatch("GuardError:aRequiredProp")
    expect(errors.aNotRequiredProp).toBeUndefined()
  })
})
