import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { UserInfo } from '../models/user.model';
import CommonLayout, { FallbackPlaceHolder } from '../layouts/CommonLayout';
import { RouteConfig } from './routes.config';

const beforeEachRoute = (item: any) => {
    let { name, auth } = item.meta
    if (name) {
        Promise.resolve().then(() => {
            document.title = name
        })
    }
    if (auth && !UserInfo.data) {
        return <Navigate to="/login" replace />
    }
    return <item.element />
}

const WithBeforeEach = (item: any) => {
    return () => {
        const WithBeforeCheckElement = beforeEachRoute(item)
        return WithBeforeCheckElement
    }
}

const getAuthRouteByMeta = (item: any) => {
    const WithBeforeEachElement = WithBeforeEach(item)
    return <Route key={item.path} path={item.path} element={<WithBeforeEachElement />} />
}

const EmptyLayoutRoutes: any[] = []
const CommonLayoutRoutes: any[] = []
const UnUsedCommonLayoutPaths: any[] = []
RouteConfig.forEach(item => {
    if (item.layout === 'common') {
        CommonLayoutRoutes.push(getAuthRouteByMeta(item))
    } else {
        EmptyLayoutRoutes.push(getAuthRouteByMeta(item))
        UnUsedCommonLayoutPaths.push(item.path)
    }
})

const AppRoutes = () => {
    return (
        <Suspense fallback={<FallbackPlaceHolder excludes={UnUsedCommonLayoutPaths} />}>
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