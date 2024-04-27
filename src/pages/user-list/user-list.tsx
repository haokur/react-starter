import { useNavigate } from 'react-router-dom'

interface IUser {
    id: number,
    name: string,
    age: number
}
function UserList() {
    const navigate = useNavigate()

    const userList = [
        { id: 1, name: "jack", age: 16 },
        { id: 2, name: "nancy", age: 18 }
    ]

    const handleGoUserDetail = (user: IUser) => {
        navigate(`/user-detail/${user.id}?name=${user.name}&age=${user.age}`)
    }

    return (
        <div className='user-list'>
            {
                userList.map(item => {
                    return (
                        <div key={item.id} className="user-item" onClick={() => handleGoUserDetail(item)}>
                            ID: {item.id}, Name: {item.name}, Age: {item.age}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserList