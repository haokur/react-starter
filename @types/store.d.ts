
interface ICommonSliceState {
    count: number,
}

interface ITestSliceState {
    count: number,
}

interface IUserSliceState {
    user: {
        name: string,
        age: number,
    }
}

interface IStoreState {
    common: ICommonSliceState,
    test: ITestSliceState,
    user: IUserSliceState
}


