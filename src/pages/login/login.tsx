import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../models/user.model";

const LoginPage = () => {
    useEffect(() => {
        if (UserInfo.data) {
            navigate("/")
        }
    }, [])

    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        name: "jack",
        password: "123456"
    })

    const handleLoginFormChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [ev.target.name]: ev.target.value
        })
    }

    const handleLogin = () => {
        localStorage.setItem("user", JSON.stringify(loginForm))
        navigate("/")
    }

    return (
        <div>
            <input type="text" name="name" value={loginForm.name} onChange={handleLoginFormChange} />
            <input type="password" name="password" value={loginForm.password} onChange={handleLoginFormChange} />
            <button onClick={handleLogin}>登录</button>
        </div>
    )
}

export default LoginPage;