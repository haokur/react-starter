import { assert, describe, test } from "vitest";

describe("Assert.spec", () => {
    test("assert", () => {
        let a = 'foo'
        let b = 'bar'
        assert(a !== b, "foo should not be equal to bar")
        // assert.fail('foo not equal bar'); // 输出错误
        assert.isOk(true, "this is ok")
        assert.isNotOk(a === b, "this is not equal")

        assert.equal(Math.sqrt(4), 2)
        assert.notEqual(Math.sqrt(4), 3)
        let obj = { a: 1 }
        assert.strictEqual(obj, obj)
        assert.notStrictEqual(obj, { a: 1 })
        assert.deepEqual({ a: 1 }, { a: 1 })
        assert.notDeepEqual({ a: 1 }, { b: 1 })
        assert.isAbove(5, 2, '5大于2')
        assert.isAtLeast(2, 2, '2大于等于2')
        assert.isBelow(2, 5, '2小于5')
        assert.isAtMost(2, 2, '2小于等于2')

        assert.isTrue(1 === 1)
        assert.isNotTrue(a === 'bar')
        assert.isFalse(a === 'bar')
        assert.isNotFalse(1 === 1)
        assert.isNull(null)
        assert.isNotNull(a)
        assert.isNaN(NaN)
        assert.isNotNaN(1)
        assert.exists(a)

        const foo = undefined
        assert.notExists(foo)
        assert.isUndefined(foo)
        assert.isDefined(a)
        assert.isFunction(() => { })
        assert.isNotFunction(1)
        assert.isObject({})
        assert.isNotObject(1)

        assert.isArray([])
        assert.isNotArray({})
        assert.isString("")
        assert.isNotString(1)
        assert.isNumber(1)
        assert.isNotNumber('1')
        assert.isBoolean(false)
        assert.isNotBoolean(1)

        assert.typeOf(1, 'number')
        assert.notTypeOf(1, 'string')

        class Person { }
        const p1 = new Person()
        assert.instanceOf(p1, Person)
        assert.notInstanceOf(foo, Person)


    })
})