import React from "react"

type withAction = WithChildren<IUser> & {
    updateUser?: (id: number) => void
}
const UserCard: React.FC<withAction> = (props) => {
    const { id, name, age, children, updateUser } = props

    const updateUserAge = () => {
        updateUser && updateUser(id)
    }

    return (
        <div>
            <div>
                <span>User:{id}-</span>
                <span>{name}-</span>
                <span>{age}</span>
                {updateUserAge && (<button onClick={updateUserAge}>更新用户年龄</button>)}
            </div>
            <div className="children">
                {children}
            </div>
        </div>
    )
}

export default UserCard
