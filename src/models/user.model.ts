
interface IUserInfoData {
    data: {
        name: string,
        age: number,
    } | null
}
/**用户信息 */
export const UserInfo = new Proxy<IUserInfoData>({ data: null }, {
    get: function (target, prop, receiver) {
        if (!target.data) {
            let _localData = localStorage.getItem("user")
            if (_localData) {
                Reflect.set(target, 'data', JSON.parse(_localData))
            }
        }
        return Reflect.get(target, prop, receiver)
    },
    set: function (target, prop, value, receiver) {
        Reflect.set(target, prop, value, receiver)
        if (value) {
            let _localStoreValue = typeof value === 'string'
                ? value
                : JSON.stringify(value)
            localStorage.setItem("user", _localStoreValue)
        } else {
            localStorage.removeItem("user")
        }
        return true
    }
})