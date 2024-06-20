import {
    assert, bench, describe, expect,
    test, beforeEach, afterEach,
    beforeAll, afterAll,
    onTestFinished,
    onTestFailed,
} from "vitest";

const Env = process.env.NODE_ENV
const IsTest = Env === 'test'

// 生命周期钩子
let beforeCount = 0
let afterCount = 0
beforeEach(async () => {
    beforeCount++
    // console.log("测试用例前", beforeCount);
})
afterEach(async () => {
    afterCount++
    // console.log("测试用例后", afterCount);
})
beforeAll(() => {
    // console.log("所有用例前", "Main.spec.tsx::22行");
})
afterAll(() => {
    // console.log("所有用例后", "Main.spec.tsx::22行");
})

// 单个测试用例结束
function getDb() {
    console.log("连接db")
    onTestFinished(() => { console.log("关闭db连接") })
}

describe.skip('vitest-test', () => {
    // 跳过测试
    test.skip("skipped test", () => {
        assert.equal(Math.sqrt(4), 3)
    })
    // 条件成立=>跳过
    test.skipIf(IsTest)("it will skip if env is test", () => {
        assert.equal(Math.sqrt(4), 3)
    })

    // 条件成立=>执行
    test.runIf(IsTest)("it will run if env is test", () => {
        assert.equal(Math.sqrt(4), 2)
    })

    // 当前测试套件中仅测试当前用例,其他的都将跳过[skipped]
    // 跳过的用例不会执行,即使报错也不会提示检验不通过
    // test.only('only test', () => {
    //     assert.equal(Math.sqrt(4), 2)
    // })

    // 并行运行测试
    test.concurrent("test1", () => {
        assert.equal(Math.sqrt(9), 3)
    })
    test.concurrent("test2", () => {
        assert.equal(Math.sqrt(25), 5)
    })

    // 顺序测试
    test.sequential('顺序1', () => {
        assert.equal(Math.sqrt(16), 4)
    })

    // 待测试的占位,会跳过
    test.todo("this will be a test")

    // 表示必错判断
    test.fails('判断为必错,然后总测试结果为通过', () => {
        assert.equal(Math.sqrt(16), 5)
    })

    // each多条数据测试,可以使用%s,%d,%i等,也可以使用$
    // 由例子可看出,数组时按索引位置来提取占位的值,对象由$a,来取对象的a的值
    test.each([
        [1, 1, 2],
        [1, 2, 3]
    ])('测试两数相加%d+%d+%d=%d', (a, b, c) => {
        // console.log(a, b, c, "Main.spec.tsx::52行");
        expect(a + b).toBe(c)
    });
    test.each([
        { a: 1, b: 2, c: 3 }
    ])(`测试两数相加$a+$b=$c`, ({ b, c, a: z, }) => {
        console.log(z, b, c, "Main.spec.tsx::52行");
        expect(z + b).toBe(c)
    });

    test("测试onTestFinished", () => {
        let db = getDb()
        assert.equal(true, true)
        console.log('测试测试onTestFinished用例完成')
    })

    test("测试onTestFinished2", () => {
        let db = getDb()
        assert.equal(1, 1)
        console.log('测试测试测试onTestFinished2用例完成')
    })

    // 测试用例失败后触发
    // test("when onTestFailed", () => {
    //     assert.equal(1, 2)
    //     onTestFailed((...params) => {
    //         console.log("测试失败了", params);
    //     })
    // })
})

// 跳过的测试块
describe.skip('skip describe', () => {
    test.sequential('错误测试用例', () => {
        assert.equal(Math.sqrt(16), 5)
    })
})

// 条件跳过
describe.skipIf(false)("非测试条件跳过", () => {
    test('非跳过的用例', () => {
        assert.equal(Math.sqrt(16), 4)
    })
})

// 仅运行此测试块
// describe.only('仅运行此测试块', () => {
//     test('test', () => {
//         assert.equal(Math.sqrt(16), 4)
//     })
// })

// 并发测试
// describe.concurrent
// 顺序测试
// describe.sequential
// todo
describe.todo("some describe todo...")







// bench相关
// describe('vitest-bench', () => {

// })

// bench(
//     'normal sorting',
//     () => {
//         const x = [1, 5, 4, 2, 3]
//         x.sort((a, b) => {
//             return a - b
//         })
//     },
//     { time: 1000 }
// )