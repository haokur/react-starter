import { useQuery } from "../../hooks/query.hook"

const UserDetailPage = () => {
    const [query, params, hashQuery] = useQuery<{ id: string }, { id: string }, { name: string }>()
    console.log(query.id, params.id, hashQuery.name);
    return (
        <div>
            <h3>this is detail page</h3>
            <div>
                <strong>query参数：</strong>
                <span>{JSON.stringify(query)}</span>
            </div>
            <div>
                <strong>hash中的query参数：</strong>
                <span>{JSON.stringify(hashQuery)}</span>
            </div>
            <div>
                <strong>路由动态参数：</strong>
                <span>{JSON.stringify(params)}</span>
            </div>
        </div>
    )
}

export default UserDetailPage