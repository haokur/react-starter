import React from "react"

const LoginPage = React.lazy(() => import("../pages/login/login"))
const RegisterPage = React.lazy(() => import("../pages/register/register"))

const HomePage = React.lazy(() => import('../pages/home/home'))
const AboutPage = React.lazy(() => import('../pages/about/about'))
const ContactPage = React.lazy(() => import('../pages/contact/contact'))
const UserDetailPage = React.lazy(() => import('../pages/user/detail'))
const ClassVsFunc = React.lazy(() => import('../pages/class-vs-func/class-vs-func'))
const CommonHooks = React.lazy(() => import('../pages/common-hooks/common-hooks'))

export const RouteConfig = [
    {
        path: '/login',
        element: LoginPage,
        layout: null,
        meta: { auth: false, hide: true, name: "登录" }
    },
    {
        path: '/register',
        element: RegisterPage,
        layout: null,
        meta: { auth: false, hide: true, name: "注册" }
    },
    {
        path: '/',
        element: HomePage,
        layout: 'common',
        meta: { auth: true, hide: false, name: "首页", icon: 'icon-home' }
    },
    {
        path: '/about',
        element: AboutPage,
        layout: 'common',
        meta: { auth: true, hide: false, name: "关于我们", icon: "icon-idea" }
    },
    {
        path: '/contact',
        element: ContactPage,
        layout: 'common',
        meta: { auth: true, hide: false, name: "联系我们", icon: "icon-zuanshi1" }
    },
    {
        path: '/user/detail/:id',
        element: UserDetailPage,
        layout: 'common',
        meta: { auth: true, hide: true, name: "用户详情" }
    },
    {
        path: '/class-vs-func',
        element: ClassVsFunc,
        layout: 'common',
        meta: { auth: true, hide: false, name: "类组件与函数组件", icon: "icon-rili" }
    },
    {
        path: '/common-hooks',
        element: CommonHooks,
        layout: 'common',
        meta: { auth: true, hide: false, name: "常用hooks", icon: "icon-fenlei-copy" }
    },
]