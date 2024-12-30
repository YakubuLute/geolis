
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';


// Landing page components
import Header from "../component/shared/Header/index.jsx";
import Footer from "../component/shared/Footer/index.jsx";
import Home from "../Pages/Home/index.jsx";
import PageNotFound from "../component/shared/404/index.jsx";
import { ContactPage } from "../Pages/Home/Menu/Contact/index.jsx";
// import Dashboard from "../Pages/Dashboard/index.jsx";
import AuthPage from "../component/Auth/index";
// import BlogPage from "../Pages/Dashboard/blog.jsx";
import IndexPage from "../Pages/Dashboard/app.jsx"
import ProductsPage from "../Pages/Dashboard/products.jsx"
import UserPage from "../Pages/Dashboard/user.jsx"

import LandListing from "../Pages/Home/Menu/landlisting/LandListing.jsx"
import Faqs from "../Pages/Home/Menu/Faqs/faqs.jsx";
import { ForgotPassword } from "../component/Auth/resetpassword.jsx";
import LandDetails from "../Pages/Home/Menu/LandDetails/index.tsx";
import { useFireStoreContext } from '../context/FireStoreContext.js';
// Dashboard components
import DashboardLayout from '../layouts/dashboard/index.jsx';
import Loading from "../component/shared/Loader/loader.jsx"
import { ToastContainer } from 'react-toastify';
import ProfilePage from '../Pages/Dashboard/profile.jsx';


const PrivateRoute = ({ children }) => {
  const { userData, isUserDataLoading } = useFireStoreContext();

  if (isUserDataLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const PublicLayout = ({ children }) => {
  const currentUrl = window.location.pathname;
  const showHeaderFooter = !currentUrl.includes("/auth") && !currentUrl.includes("/dashboard");

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

const MainRouter = () => {
  const { userData, isUserDataLoading } = useFireStoreContext();

  if (isUserDataLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ToastContainer autoClose={5000} />
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout><Outlet /></PublicLayout>}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={userData ? <Navigate to='/dashboard' /> : <AuthPage />} />
          <Route path="/auth/reset-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/land-listing" element={<LandListing />} />
          <Route path="/land/details/:id" element={<LandDetails />} />
          <Route path="/faqs" element={<Faqs />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Suspense fallback={<div>Loading dashboard...</div>}>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </Suspense>
          </PrivateRoute>
        }>
          <Route index element={<IndexPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="land" element={<ProductsPage />} />
        </Route>

        {/* 404 and catch-all */}
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;