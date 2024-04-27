import { useParams } from "react-router-dom";
import UserCard from "../../components/UserCard";
import { useState } from "react";

function Detail() {
    const { id, } = useParams()
    const idNumber = parseInt(id || "0")
    const params = new URLSearchParams(location.search)
    const name = params.get('name') || ""
    const age = parseInt(params.get('age') || "0")
    const [userInfo, updateUserInfo] = useState({
        id: idNumber, name, age
    })

    const updateUser = (id: number) => {
        console.log("更新用户年龄", id, userInfo,)
        updateUserInfo({
            ...userInfo,
            age: ++userInfo.age
        })
    }

    return <div>
        <h1>Detail Page</h1>
        <UserCard {...userInfo} updateUser={updateUser}>
            <div>slot content from parent</div>
        </UserCard>
    </div>;
}

export default Detail;