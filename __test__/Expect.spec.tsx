import { describe, expect, test } from "vitest";

function returnSome() {
    return 'a'
}

function returnVoid() { }

class Person { }

function throwError() {
    throw "发生错误了"
}

interface CustomMatchers<R = unknown> {
    toBeFoo: () => R
}

declare module 'vitest' {
    interface Assertion<T = any> extends CustomMatchers<T> { }
    interface AsymmetricMatchersContaining extends CustomMatchers { }
}

expect.extend({
    toBeFoo: (received, expected) => {
        if (received !== 'foo') {
            return {
                message: () => `expected ${received} to be foo`,
                pass: false,
            }
        } else {
            return {
                message: () => `pass`,
                pass: true,
            }
        }
    }
})


describe.skip("expect test", () => {
    // 下面执行有问题,会显示add test是成功的,但是add test2是失败的
    // test("add test", () => {
    //     expect.soft(1 + 1).toBe(3)
    //     // expect(1 + 1).toBe(3)
    // });
    // test("add test2????", () => {
    //     expect.soft(2 + 2).toBe(4)
    // })

    // 否定断言,not
    test("not equal", () => {
        expect(2 + 2).not.toBe(5)
    })
    test("test obj", () => {
        let a = { name: "jack" }
        let b = { name: "jack" }
        let c = b
        // expect(a).toBe(b) // false
        expect(c).toBe(b) // true
        expect(a).toEqual(b) // true
        expect(a).toStrictEqual(b); // true
    })

    test.fails("test float", () => {
        expect(0.2 + 0.1).toBe(0.3)
    })
    test("test to be close", () => {
        expect(0.2 + 0.1).toBeCloseTo(0.3)
    })
    test('result is defined', () => {
        expect(returnSome()).toBeDefined()
    })
    test('result is undefined', () => {
        expect(returnVoid()).toBeUndefined()
        expect(undefined).toBeUndefined()
    })
    test('result is truly false value', () => {
        expect(true).toBeTruthy();
        expect(1).toBeTruthy()
        expect('a').toBeTruthy()
        // expect(0).toBeTruthy() ; // false

        expect(0).toBeFalsy(); // true
    })
    test('is null', () => {
        expect(null).toBeNull()
    })
    test('to be NaN', () => {
        // @ts-ignore
        expect('a' * 1).toBeNaN()
        expect(NaN).toBeNaN()
    })

    test("typeof", () => {
        expect(typeof '123').toBeTypeOf("string")
    })

    test("instance of", () => {
        const p1 = new Person()
        expect(p1).toBeInstanceOf(Person)
    })

    test("大小比较", () => {
        expect(1).toBeGreaterThan(0)
        expect(1).toBeGreaterThanOrEqual(0)
        expect(1).toBeLessThan(2)
        expect(1).toBeLessThanOrEqual(2)
    })

    test('equal', () => {
        expect({ name: 'jack' }).toEqual({ name: 'jack' })
        expect({ name: 'jack' }).toStrictEqual({ name: 'jack' })
    })
    test('strict equal', () => {
        expect({ name: undefined, b: 2 }).toEqual({ b: 2 }) // true
        // expect({ name: undefined, b: 2 }).toStrictEqual({ b: 2 }) // false
    })

    test("包含测试toContain", () => {
        expect([1, 2, 3]).toContain(1)
        expect([1, 2, 3].includes(1)).toBe(true)

        expect([{ name: "jack" }]).toContainEqual({ name: "jack" })
    })

    test("length属性及值", () => {
        expect([1, 2, 3]).toHaveLength(3)
    })

    test("是否含有某个属性", () => {
        expect("abc").toHaveProperty("substring")
        expect({ name: "xxx" }).toHaveProperty("name")
    })

    test("正则match", () => {
        expect("abc").toMatch(/\w+/)
    })

    test("是否是对象的一部分", () => {
        const johnInvoice = {
            customer: {
                first_name: 'John',
            },
            total_amount: 5000,
        }

        const johnDetails = {
            customer: {
                first_name: 'John',
            },
        }
        expect(johnInvoice).toMatchObject(johnDetails)
    })

    test("throwError", () => {
        expect(() => throwError()).toThrowError("发生错误了")
    })

    test("检查值是否满足一个函数的判断", () => {
        const checkFunc = (num) => num >= 0
        expect(1).toSatisfy(checkFunc)
    })
})

describe.skip("值的替代占位", () => {
    test("任意值占位替代", () => {
        expect({ name: "jack" }).toEqual({ name: expect.anything() })
        expect({ name: "jack" }).toEqual({ name: expect.any(String) })
    })

    test("closeTo 接近于", () => {
        expect(0.1 + 0.2).toBeCloseTo(0.3)
        expect({ num: 0.1 + 0.2 }).toEqual({ num: expect.closeTo(0.3) })
    })

    test("数组中的占位arrayContaining", () => {
        expect({ data: [1, 2, 3] }).toEqual({ data: expect.arrayContaining([1, 2]) })
    })

    test("对象中的占位objectContaining", () => {
        expect({ data: [1, 2, 3] }).toEqual(expect.objectContaining({ data: expect.arrayContaining([1, 2]) }))
    })

    test("字符串中的contain", () => {
        expect({ name: "abc" }).toEqual({ name: expect.stringContaining('a') })
        // expect({ name: "abc" }).toEqual({ name: expect.stringMatching(/w+/) })
    })

    test("自定义expect占位", () => {
        expect({ name: 'foo' }).toEqual({ name: expect.toBeFoo() })
    })
})