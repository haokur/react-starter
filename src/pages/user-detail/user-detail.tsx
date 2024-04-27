import { useParams } from "react-router-dom";

function Detail() {
    const { id, } = useParams()
    const params = new URLSearchParams(location.search)
    const name = params.get('name')
    const age = params.get('age')

    return <div>
        <h1>Detail Page</h1>
        <div>
            <span>User:{id}-</span>
            <span>{name}-</span>
            <span>{age}</span>
        </div>
    </div>;
}

export default Detail;