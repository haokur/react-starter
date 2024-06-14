import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserInfo } from '../models/user.model';
import CommonLayout from '../layouts/CommonLayout';

const LoginPage = React.lazy(() => import("../pages/login/login"))

const HomePage = React.lazy(() => import('../pages/home/home'))
const AboutPage = React.lazy(() => import('../pages/about/about'))
const ContactPage = React.lazy(() => import('../pages/contact/contact'))
const UserDetailPage = React.lazy(() => import('../pages/user/detail'))

const WithLayoutAndAuth = (props: any) => {
    let _user = UserInfo.data
    let { element, children } = props
    if (_user) {
        return <CommonLayout>{element || children}</CommonLayout>
    } else {
        return <Navigate to="/login" replace />
    }
}

export const RouteConfig = [
    {
        path: '/login',
        element: LoginPage,
        layout: null,
        meta: { hide: true, name: "登录" }
    },
    {
        path: '/',
        element: HomePage,
        layout: 'common',
        meta: { hide: false, name: "首页" }
    },
    {
        path: '/about',
        element: AboutPage,
        layout: 'common',
        meta: { hide: false, name: "关于我们" }
    },
    {
        path: '/contact',
        element: ContactPage,
        layout: 'common',
        meta: { hide: false, name: "联系我们" }
    },
    {
        path: '/user/detail/:id',
        element: UserDetailPage,
        layout: 'common',
        meta: { hide: true, name: "用户详情" }
    },
]

const RouteComponents = RouteConfig.map((item) => {
    if (item.layout === 'common') {
        return <Route key={item.path} path={item.path} element={<WithLayoutAndAuth><item.element /></WithLayoutAndAuth>} />
    }
    return <Route key={item.path} path={item.path} element={<item.element />} />
})

const AppRoutes = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Routes>
                {RouteComponents}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;