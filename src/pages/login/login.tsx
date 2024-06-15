import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../models/user.model";

import './login.scss'
import { Link } from "react-router-dom";

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
        console.log(ev, "login.tsx::22行");
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
            <div className='login'>
                <h1 className='login-title'>login</h1>
                <div className="form">
                    <div className="form-row">
                        <label className="form-row__label">账号:</label>
                        <input name="name" className="form-row__content" type="text" value={loginForm.name} onChange={handleLoginFormChange} />
                    </div>
                    <div className="form-row">
                        <label className="form-row__label">密码:</label>
                        <input name="password" className="form-row__content" type="password" value={loginForm.password} onChange={handleLoginFormChange} />
                    </div>
                    <div className="form-row form-action">
                        <button className="form-action__item" onClick={handleLogin}>提交</button>
                    </div>
                    <div className="form-row form-more">
                        <Link to="/register">没有账号，去注册</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;