
import React from 'react';
import './login.scss'

interface ILoginFormState {
    accout: string,
    password: string
}
interface ILoginPageState {
    formTitle: string,
    loginForm: ILoginFormState
}

class LoginPage extends React.Component {
    state: ILoginPageState = {
        formTitle: "React管理中心",
        loginForm: {
            accout: "admin",
            password: ""
        }
    }

    componentDidMount(): void {
        console.log('componentDidMount----');
        this.setState({
            "formTitle": "React管理中心新"
        })
    }

    handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        this.setState((prevState: ILoginPageState) => ({
            ...prevState,
            loginForm: {
                ...prevState.loginForm,
                [name]: value,
            },
        }));
    }

    handleLoginSubmit = () => {
        console.log(this.state.loginForm, "登录表单信息");
    }

    render(): React.ReactNode {
        const { formTitle, loginForm } = this.state
        return (
            <div className='login-container'>
                <h1 className='login-title'>{formTitle}</h1>
                <div className="login-form">
                    <div className='login-form__row'><input className='input' type="text" name="accout" value={loginForm.accout} placeholder="请输入账号" onChange={this.handleLoginFormChange} /></div>
                    <div className='login-form__row'><input className='input' type="password" name="password" value={loginForm.password} placeholder="请输入密码" onChange={this.handleLoginFormChange} /></div>
                </div>
                <div className='login-action'>
                    <button className='login-action__btn' onClick={this.handleLoginSubmit}>登录</button>
                </div>
            </div>
        )
    }
}

export default LoginPage