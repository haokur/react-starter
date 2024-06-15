import { useCallback, useState } from 'react'
import './register.scss'
import { useNavigate } from 'react-router-dom'
import { UserInfo } from '../../models/user.model'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    const [registerForm, setRegisterForm] = useState({
        username: 'admin',
        password: '123456'
    })

    const handleFormChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = ev.target
        setRegisterForm({ ...registerForm, [name]: value })
    }, [])

    const navigate = useNavigate()
    const handleSubmitForm = () => {
        UserInfo.data = { name: registerForm.username, age: 18 }
        navigate("/")
    }

    return <div className='register'>
        <h1 className='register-title'>Register</h1>
        <div className="form">
            <div className="form-row">
                <label className="form-row__label">账号:</label>
                <input name="username" className="form-row__content" type="text" value={registerForm.username} onChange={handleFormChange} />
            </div>
            <div className="form-row">
                <label className="form-row__label">密码:</label>
                <input name='password' className="form-row__content" type="password" value={registerForm.password} onChange={handleFormChange} />
            </div>
            <div className="form-row form-action">
                <button className="form-action__item" onClick={handleSubmitForm}>提交</button>
            </div>
            <div className="form-row form-more">
                <Link to="/login">已有账号，去登录</Link>
            </div>
        </div>
    </div>
}
export default RegisterPage