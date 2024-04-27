
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './login.scss'

import { setUserInfo } from '../../stores/user.store';

function LoginPage() {
    const [formTitle, setFormTitle] = useState("React管理中心")
    const [loginForm, setLoginForm] = useState({
        accout: "admin",
        password: ""
    })

    useEffect(() => {
        setFormTitle("React管理中心新")
    }, [])

    function handleLoginFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setLoginForm({
            ...loginForm,
            [name]: value,
        })
    }

    const navigate = useNavigate(); // 注意，这里不能放在handleLoginSubmit方法里
    const dispatch = useDispatch();
    const handleLoginSubmit = () => {
        console.log(loginForm, "登录表单信息");
        dispatch(setUserInfo({
            id: 1,
            name: loginForm.accout,
            age: 19
        }))
        navigate("/user-list")
    }

    return (
        <div className='login-container'>
            <h1 className='login-title'>{formTitle}</h1>
            <div className="login-form">
                <div className='login-form__row'><input className='input' type="text" name="accout" value={loginForm.accout} placeholder="请输入账号" onChange={handleLoginFormChange} /></div>
                <div className='login-form__row'><input className='input' type="password" name="password" value={loginForm.password} placeholder="请输入密码" onChange={handleLoginFormChange} /></div>
            </div>
            <div className='login-action'>
                <button className='login-action__btn' onClick={handleLoginSubmit}>登录</button>
            </div>
        </div>
    )
}

export default LoginPage