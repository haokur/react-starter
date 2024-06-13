/**用户信息 */
export const UserInfo = new Proxy({ data: null }, {
    get: function (target, prop, receiver) {
        if (!target.data) {
            let _localData = localStorage.getItem("user")
            Reflect.set(target, 'data', _localData)
        }
        return Reflect.get(target, prop, receiver)
    },
    set: function (target, prop, value, receiver) {
        Reflect.set(target, prop, value, receiver)
        localStorage.setItem("user", value)
        if (prop === 'data' && !value) {
            localStorage.removeItem("user")
        }
        return true
    }
})