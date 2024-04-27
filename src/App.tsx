import { ChangeEvent, useState } from "react"

function App() {
  const formTitle = "React管理中心"

  const [loginForm, setLoginForm] = useState({
    accout: "admin",
    password: ""
  })

  const handleLoginFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleLoginSubmit = () => {
    console.log(loginForm, "登录表单信息");
  }

  return (
    <>
      <h1>{formTitle}</h1>
      <div><input type="text" name="accout" value={loginForm.accout} placeholder="请输入账号" onChange={handleLoginFormChange} /></div>
      <div><input type="password" name="password" value={loginForm.password} placeholder="请输入密码" onChange={handleLoginFormChange} /></div>
      <div>
        <button onClick={handleLoginSubmit}>登录</button>
      </div>
    </>
  )
}

export default App
