import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../../layouts/dashboard/index';

// Use const declarations instead of import statements
const IndexPage = lazy(() => import('../../Pages/Dashboard/index'));
const BlogPage = lazy(() => import('../../Pages/Dashboard/blog'));
const UserPage = lazy(() => import('../../Pages/Dashboard/user'));
const LoginPage = lazy(() => import('../../Pages/Dashboard/login'));
const ProductsPage = lazy(() => import('../../Pages/Dashboard/products'));
const Page404 = lazy(() => import('../../Pages/Dashboard/page-not-found'));

export  function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    { path: 'login', element: <LoginPage /> },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

  return routes;
}

export default {
  BlogPage,
  IndexPage,
  ProductsPage,
  UserPage,
  LoginPage,
  Page404,
}