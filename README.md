# 如何从0开始React开发

### 使用vite命令创建项目

```
npm init vite@latest
```

依次输入或者选择:
```
✔ Project name: … react-steps
✔ Select a framework: › React
✔ Select a variant: › TypeScript
```

安装依赖:
cnpm install

执行:
npm run dev

### 删除不必要的文件和代码,调整成日常实际开发项目结构
src 目录下结构如下:

```
--src/
----assets/
----components/
----pages/
----styles/
------basic.scss
----App.tsx
----main.tsx
----vite-env.d.ts
```

### React基本用法和写法
```tsx
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
```

以上代码演示了:
* 变量怎么渲染到对应DOM位置
* 表单值的绑定以及输入后的更新操作,类似vue的v-model
* 事件的绑定和触发