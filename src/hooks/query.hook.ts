
/**通用合并路径动态参数,query参数 */
import { useParams, useSearchParams } from "react-router-dom"

interface IQueryResult {
    [key: string]: string | undefined
}
type IQueryTuple<T, K, J> = [T, K, J];
export const useQuery = <T extends IQueryResult = IQueryResult, K extends IQueryResult = IQueryResult, J extends IQueryResult = IQueryResult>(): IQueryTuple<T, K, J> => {
    let params: T = useParams() as T

    const search = new URLSearchParams(location.search)
    let _searchObj: K = {} as K
    search.forEach((value, key) => Object.assign(_searchObj, { [key]: value }))

    const [searchParams] = useSearchParams();
    let _hashSearch: J = {} as J
    searchParams.forEach((value, key) => Object.assign(_hashSearch, { [key]: value }))

    return [params, _searchObj, _hashSearch]
}