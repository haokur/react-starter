import { useParams } from "react-router-dom";
import UserCard from "../../components/UserCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { plusOrReduce } from '../../stores/counter.store'

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

    const counterValue = useSelector((state: IStoreRoot) => state.counter.currnetValue)

    const dispatch = useDispatch()
    const setCounterValue = () => dispatch(plusOrReduce(2))

    return <div>
        <div style={{ margin: "20px" }}>
            <h1>Detail Page-应用计数{counterValue}</h1>
            <button onClick={setCounterValue}>计数增加</button>
        </div>
        <UserCard {...userInfo} updateUser={updateUser}>
            <div>slot content from parent</div>
        </UserCard>
    </div>;
}

export default Detail;