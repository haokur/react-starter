import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UserInfo } from '../models/user.model';
import CommonLayout, { FallbackPlaceHolder } from '../layouts/CommonLayout';
import { RouteConfig } from './routes.config';

const Auth = (props: any) => {
    let _user = UserInfo.data
    let { children } = props
    return _user ? children : <Navigate to="/login" replace />
}

const getAuthRouteByMeta = (item: any) => {
    let element = item.meta.auth
        ? <Auth><item.element /></Auth>
        : <item.element />
    return <Route key={item.path} path={item.path} element={element} />
}

const EmptyLayoutRoutes = RouteConfig.filter(item => !item.layout)
    .map(item => getAuthRouteByMeta(item))

const CommonLayoutRoutes = RouteConfig
    .filter(item => item.layout === 'common')
    .map((item) => getAuthRouteByMeta(item))


const unUsedCommonLayoutPaths = RouteConfig
    .filter(item => item.layout !== 'common')
    .map((item) => item.path)

const AppRoutes = () => {
    return (
        <Suspense fallback={<FallbackPlaceHolder excludes={unUsedCommonLayoutPaths} />}>
            <Routes>
                <Route element={<CommonLayout />}>
                    {CommonLayoutRoutes}
                </Route>
                {EmptyLayoutRoutes}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;