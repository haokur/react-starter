import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserInfo } from '../models/user.model';

const LoginPage = React.lazy(() => import("../pages/login/login"))

const HomePage = React.lazy(() => import('../pages/home/home'))
const AboutPage = React.lazy(() => import('../pages/about/about'))
const ContactPage = React.lazy(() => import('../pages/contact/contact'))

// 登录校验拦截
const Auth = (props: any) => {
    let _user = UserInfo.data
    let { element } = props
    return _user ? element : <Navigate to="/login" replace />
}

const AppRoutes = () => {
    return (
        <Suspense fallback={<div></div>}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Auth element={<HomePage />} />} />
                <Route path="/about" element={<Auth element={<AboutPage />} />} />
                <Route path="/contact" element={<Auth element={<ContactPage />} />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;