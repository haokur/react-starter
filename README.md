# React开发

### 1.使用vite命令创建项目

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

### 2.删除不必要的文件和代码,调整成日常实际开发项目结构
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

### 3.引入路由,将刚写的登录表单从App.tsx移动到pages/login下
1. 安装路由依赖:
```
cnpm install react-router-dom --save
```

2. 在src/App.tsx中引入路由:
```tsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from "./pages/login/login"
import "./styles/basic.scss"

function App() {
  return (
    <Router>
      <div>
        <Link to="/login">跳转登录</Link>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
```

3. pages/login/login.tsx
```tsx
import React from 'react';

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
            <div>
                <h1>{formTitle}</h1>
                <div>
                    <div><input type="text" name="accout" value={loginForm.accout} placeholder="请输入账号" onChange={this.handleLoginFormChange} /></div>
                    <div><input type="password" name="password" value={loginForm.password} placeholder="请输入密码" onChange={this.handleLoginFormChange} /></div>
                </div>
                <div>
                    <button onClick={this.handleLoginSubmit}>登录</button>
                </div>
            </div>
        )
    }
}

export default LoginPage
```
* ~~页面级的组件,因为可能需要监听生命周期,所以都统一使用类组件.~~,react已经被hooks包围了,使用函数组件更顺手
* 这里在pages下新增了一层文件夹login,是方便login.scss和login.tsx归属在login目录下
* 不使用 pages/login/index.tsx,因为多页面时很多index.tsx不利于文件搜索查找

#### 函数组件
```tsx
import { useState } from "react"
function FuncCpt(){
    const [title,setTitle] = useState("默认标题")
    return (
        <div>
            <div>{title}</div>
            <button onClick={()=>setTitle("新标题")}>修改标题</button>
        </div>
    )
}
```

#### 类组件
```tsx
import React from "react"
class ClassCpt extends React.Component {
    state = {
        title: "默认标题"
    }

    setTitleData = () => {
        this.setState({
            title: "新标题"
        })
    }
    render(): React.ReactNode {
        return (
            <div>
                <div>{this.state.title}</div>
                <button onClick={()=>this.setTitleData()}
                    修改标题
                </button>
            </div>
        )
    }
}
```
以上,同样的效果,函数组件和类组件的定义和处理响应数据`title`的方式的不一样

### 4.多页面的跳转以及数据传递获取

> 用函数组件改写login.tsx,以useEffect代替componentDidMount
```tsx
useEffect(() => {
    setFormTitle("React管理中心新")
}, [])
```

* user-list带路径参数跳转到user-detail页面

```tsx
function LoginPage(){
    const navigate = useNavigate(); // 注意，这里不能放在handleGoUserDetail方法里
    const handleGoUserDetail = (user: IUser) => {
        navigate(`/user-detail/${user.id}?name=${user.name}&age=${user.age}`)
    }
    return ( <div>....</div>)
}
```

* user-detail获取路径参数和query参数
```tsx
import { useParams } from "react-router-dom";

function DetailPage(){
    const { id, } = useParams()
    const params = new URLSearchParams(location.search)
    const name = params.get('name')
    const age = params.get('age')

    return ( <div>{id}-{name}-{age}</div>)
}
```

### 5.抽离组件及组件间传值交互

* 父组件,user-detail/user-detail.tsx
```tsx
import UserCard from "../../components/UserCard";

function UserDetail(){
    // .....
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

    return <div>
        <h1>Detail Page</h1>
        <UserCard {...userInfo} updateUser={updateUser}>
            <div>slot content from parent</div>
        </UserCard>
    </div>;
}
```

* 子组件,components/UserCard.tsx
```tsx
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
```
* 将IUser抽离到?.d.ts文件中,方便跨文件通用需要引入或重新定义
* 在`tsconfig.json`中的`include`添加定义d.ts文件的目录
```json
export default {
    "compilerOptions":{//...},
    "include": ["src","@types"],
}
```
* 定义一个公用类型,包装原类型添加上children字段
```tsx
type WithChildren<T> = T & {
    children?: React.ReactNode
}
```
* 如果在原IUser上,childrne之外,再附加事件或其他时,一样用&联合类型
```tsx
type WithUserEvent = WithChildren<IUser> & {
    updateUser?: (id: number) => void
}
```

### 6.添加状态管理
1. 安装依赖
```sh
cnpm install react-redux @reduxjs/toolkit --save 
```

2. 新建stores文件夹
```
--stores
----stores.ts
----user.store.ts
```

- user.store.ts
```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const UserStore = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            id: 0,
            name: "",
            age: 18
        } as IUser
    },
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUser>) => {
            state.userInfo = action.payload
        }
    }
});

export const { setUserInfo } = UserStore.actions;
export default UserStore;
```

- stores.ts
```ts
import { configureStore } from '@reduxjs/toolkit';
import UserStore from './user.store';

const store = configureStore({
    reducer: {
        user: UserStore.reducer
    }
});

export default store;
```

3. App.tsx引入store,并使用Provider包裹main.tsx组件
- main.tsx
```ts
import { Provider } from 'react-redux'
import stores from './stores/stores'

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={stores}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
} else {
  console.error("root element not found")
}
```

4. 使用场景
- login.tsx 比如ajax拿到登录结果,存储用户信息
```tsx
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../stores/user.store';

function LoginPage(){
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
        <div>{loginForm.name}</div>
    )
}
```

5. 跨页面查看全局状态管理里的值
- pages/user-list/user-list.tsx
```ts
function UserListPage(){
    const loginAdminInfo = useSelector((state: IStoreRoot) => state.user.userInfo)
    return (
        <div>{loginadminInfo.name}</div>
    )
}
```
其中的IStoreRoot的定义在store.d.ts,对应按模块(这里指user模块)划分的state的值
按模块分,如下
```ts
interface IStoreRoot {
    user: {
        userInfo: IUser
    },
    counter:ICounter
}
```
