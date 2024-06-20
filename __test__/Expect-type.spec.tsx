import { describe, expectTypeOf, test } from "vitest";

describe.skip("Expect type", () => {
    // 类型完全相同
    test("toEqualTypeof", () => {
        expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
        expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 10 })
        expectTypeOf({ a: 1, b: 1 }).not.toEqualTypeOf<{ a: number }>()
    })

    // 类型匹配
    test("toMatchTypeof", () => {
        expectTypeOf({ a: 1, b: 2 }).toMatchTypeOf({ a: 1 })
        expectTypeOf<number>().toMatchTypeOf<string | number>()
        expectTypeOf<string | number>().not.toMatchTypeOf<number>()
    })

    // items
    test("items", () => {
        expectTypeOf([1, 2, 3]).items.toEqualTypeOf<number>();
    })

    // toBe集合
    test("toBe集合", () => {
        expectTypeOf<any>().toBeAny()
        expectTypeOf().toBeUnknown()
        expectTypeOf<never>().toBeNever()
        expectTypeOf(42).not.toBeFunction()
        expectTypeOf(() => { }).toBeFunction()
        expectTypeOf({}).toBeObject()
        expectTypeOf([]).toBeObject()
        expectTypeOf('').toBeString()
        expectTypeOf(false).toBeBoolean()
        expectTypeOf(() => { }).returns.toBeVoid()
        expectTypeOf(Symbol('aa')).toBeSymbol()
        expectTypeOf(null).toBeNull()
        expectTypeOf(undefined).toBeUndefined()
        expectTypeOf<1 | null>().toBeNullable()
        const obj = { a: 1, b: "" }
        expectTypeOf(obj).toHaveProperty("a")
    })

})